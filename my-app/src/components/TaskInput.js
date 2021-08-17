import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { taskAdded } from "../redux/features/todos/todosReducer";

function TaskInput(props) {
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();
  const columnName = props.columnName;
  
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
        <input type="text"
          className="text-input"
          value={textInput}
          onChange={onChange}
        />
        <button className="submit-button">
          Add task
        </button>
      </form>
    </div>
  )
}

export default TaskInput