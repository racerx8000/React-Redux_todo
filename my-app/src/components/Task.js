import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import Zoom from '@material-ui/core/Zoom/Zoom'
import { List } from '@material-ui/core'
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

const useStyles = makeStyles({
  root: {
    borderRadius: "50%",
  }
})

function Task(props) {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const  dispatch = useDispatch();
  const classes = useStyles();

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
    <List
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
        <DropdownTrigger
          color={color}
          id={id}
          columnName={columnName}
        />
        <input
          type="checkbox"
          onChange={() => dispatch(taskToggled({ id, columnName }))}
          defaultChecked={completed ? "checked" : ""}
        />
        <span style={completed ? completedStyle : null}>
          {title}
        </span>
        <IconButton
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
        <Button
          className={classes.root}
          color="primary"
          variant="contained"
          onClick={quitEditMode}
        >
          Set
        </Button>
      </div>
    </List>
  )
}

export default Task
