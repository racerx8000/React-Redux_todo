import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import ColumnHeader from "./ColumnHeader";
import Task from "./Task";
import TaskInput from "./TaskInput";
import { taskAddDropped } from "../redux/features/todos/todosReducer";
import { Box, Paper } from "@material-ui/core";
// import { taskDropped } from "../redux/features/dragDrop/dragDropReducer";

function TaskColumn(props) {
  const tasks = useSelector(state => state.todoList[props.columnName]);

  const dragDropState = useSelector(state => state.dragDrop);

  const { dragFrom, draggedTask } = dragDropState;

  const dispatch = useDispatch();

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drop() {
    const dropTo = props.columnName;
    dispatch(taskAddDropped({ dragFrom, dropTo, draggedTask }));
  }

  return (
    <Box
    // className="tasks-container"
    display="flex"
    flexWrap="wrap"
    flexDirection="column"
    justifyContent="center"
    onDrop={drop}
    onDragOver={allowDrop}
    >
      <Paper elevation={3}>
        <div className="background"/>
        <ColumnHeader columnName={props.columnName} />
        <ul>
          {tasks.map(task => (
            <Task
              columnName={props.columnName}
              task={task}
              // drag={props.drag}
              // dragEnd={props.dragEnd}
              // dropToColumn={props.dropToColumn}
            />
            ))}
        </ul>
      </Paper>
      <TaskInput
        columnName={props.columnName}
      />
    </Box>
  )
};

export default TaskColumn;
