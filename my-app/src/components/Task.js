import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, IconButton, Checkbox, ListItem, Input, makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";
import '@fontsource/roboto';
import DropdownTrigger from "./DropdownTrigger";
import {
  taskDeleted,
  taskEdited,
  taskToggled
} from "../redux/features/todos/todosReducer";
import { taskDragged, taskDropped } from "../redux/features/dragDrop/dragDropReducer";

const completedStyle = {
  fontStyle: "italic",
  color: "#595959",
  opacity: 0.4,
  textDecoration: "line-through"
}

const useStyles = makeStyles({
  setBtn: {
    borderRadius: "50%",
  },
  typography: {
    marginTop: "8.7%"
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

  let normalMode = {display: "flex"};
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
    <ListItem
      key={id}
      draggable="true"
      onDragStart={drag}
      onDragEnd={dragEnd}
    >
      <div
        onDoubleClick={enterEditMode}
        style={normalMode}
      >
        <span>
          <DropdownTrigger
            color={color}
            id={id}
            columnName={columnName}
          />
        </span>
        <Checkbox
          onChange={() => dispatch(taskToggled({ id, columnName }))}
          checked={completed}
        />
        <Typography
          className={classes.typography}
          style={completed ? completedStyle: null}
        >
          {title}
        </Typography>
        <IconButton
          color="secondary"
          onClick={() => {
            dispatch(taskDeleted({id, columnName }))
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <div style={editMode}>
        <Input
          onChange={onChange}
          type="text"
          value={editedTitle}
          onKeyDown={quitEditMode}         
        />
        <Button
          className={classes.setBtn}
          color="primary"
          variant="contained"
          onClick={quitEditMode}
        >
          Set
        </Button>
      </div>
    </ListItem >
  )
}

export default Task
