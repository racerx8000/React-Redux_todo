import React from "react";
import { useSelector } from 'react-redux';
import ColumnHeader from "./ColumnHeader";
import Task from "./Task";
import TaskInput from "./TaskInput";

function TaskColumn(props) {
  const tasks = useSelector(state => state.todoList[props.columnName]);

  function allowDrop(ev) {
    ev.preventDefault();
  }
  

  return (
    <div
    className="tasks-container"
    // onDrop={() => props.drop(props.column)}
    // onDragOver={allowDrop}
    >
      <div className="background"/>
      <ColumnHeader columnName={props.columnName} />
      <ul>
        {tasks.map(task => (
          <Task
            columnName={props.columnName}
            task={task}
            drag={props.drag}
            dragEnd={props.dragEnd}
            dropToColumn={props.dropToColumn}
          />
          ))}
      </ul>
      <TaskInput
        columnName={props.columnName}
      />
    </div>
  )
};

export default TaskColumn;
