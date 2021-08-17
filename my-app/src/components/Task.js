import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ColorMenu from "./ColorMenu";
import DropdownTrigger from "./DropdownTrigger";
import { taskDeleted, taskEdited, taskToggled } from "../redux/features/todos/todosReducer";

const completedStyle = {
  fontStyle: "italic",
  color: "#595959",
  opacity: 0.4,
  textDecoration: "line-through"
}

function Task(props) {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const  dispatch = useDispatch();

  const columnName = props.columnName;
  const { id, title, completed, color } = props.task;

  let normalMode = {};
  let editMode = {};

  if (editing) {
    normalMode.display = "none";
  } else {
    editMode.display = "none";
  }

  function enterEditMode() {
    setEditedTitle(title);
    setEditing(true);
  }

  function quitEditMode(ev) {
    if (ev.key === "Enter" || ev.type === "click") {
      dispatch(taskEdited({ id, columnName, editedTitle }));
      setEditedTitle("");  
      setEditing(false);
    }
  }

  function onChange(ev) {
    setEditedTitle(ev.target.value)
  } 

  return(
    <li
      key={id}
      className="draggable-elem"
      draggable="true"
      onDrag={() => props.drag(id, columnName)}
      onDragEnd={() => props.dragEnd(id, columnName, props.dropToColumn)}
    >
      <div
        onDoubleClick={enterEditMode}
        style={normalMode}
      >
        <span className="dropdown">
          <DropdownTrigger
            color={color}
          />
          <ColorMenu
            taskId={id}
            columnName={columnName}
          />
        </span>
        <input
          type="checkbox"
          onChange={() => dispatch(taskToggled({ id, columnName }))}
          defaultChecked={completed ? "checked" : ""}
        />
        <span style={completed ? completedStyle : null}>
          {title}
        </span>
        <button onClick={() => {
          dispatch(taskDeleted({id, columnName }))
        }}>
          x
        </button>
      </div>
      <div style={editMode}>
          <input 
            onChange={onChange}
            type="text"
            value={editedTitle}
            onKeyDown={quitEditMode}         
          />
        <button className="edit-todo" onClick={quitEditMode}>Set</button>
      </div>
    </li>
  )
}

export default Task
