import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ColorMenu from "./ColorMenu";
import DropdownTrigger from "./DropdownTrigger";
import {
  taskDeleted,
  taskEdited,
  taskToggled
} from "../redux/features/todos/todosReducer";
import { taskDragged, taskDropped } from "../redux/features/dragDrop/dragDropReducer";
import '@fontsource/roboto';

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
  // const useStyles = makeStyles({
  //   root: {

  //   }
  // })

  const columnName = props.columnName;
  const task = props.task;
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

  function drag() {
    dispatch(taskDragged({ columnName, task }));
  }

  function dragEnd() {
    dispatch(taskDropped());
  }

  return(
    <li
      key={id}
      className="draggable-elem"
      draggable="true"
      onDragStart={drag}
      onDragEnd={dragEnd}
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
        <IconButton
          // variant="contained"
          color="secondary"
          // size="small"
          onClick={() => {
            dispatch(taskDeleted({id, columnName }))
          }}
        >
          <DeleteIcon />
        </IconButton>
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
