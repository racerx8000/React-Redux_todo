import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { taskAdded } from "../redux/features/todos/todosReducer";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  }
}))

function TaskInput(props) {
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();
  const columnName = props.columnName;
  const classes = useStyles();
  
  function onChange(e) {
    setTextInput(e.target.value)
  }
  

  function onSubmit(e) {
    e.preventDefault();
    if (textInput.trim()) {
      dispatch(taskAdded({textInput, columnName}))
      setTextInput("")
    } else {
      alert("Please write item");
    }
  }

  return(
    <div className="input-form">
      <form onSubmit={onSubmit}>
        <TextField
          size="small"
          type="string"
          variant="outlined"
          // className="text-input"
          defaultValue={textInput}
          onChange={onChange}
        />
        <Button
          className={classes.root}
          variant="contained"
          color="primary"
          size="small"
        >
          Add task
        </Button>
      </form>
    </div>
  )
}

export default TaskInput
