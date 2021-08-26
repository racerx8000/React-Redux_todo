import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import ColumnHeader from "./ColumnHeader";
import Task from "./Task";
import TaskInput from "./TaskInput";
import { taskAddDropped } from "../redux/features/todos/todosReducer";
import { Box, Paper, List, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    margin: "8px",
    minHeight: "100%"
  },
  paper: {
    height: "77%",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto"
  },
})

function TaskColumn(props) {
  const tasks = useSelector(state => state.todoList[props.columnName]);

  const dragDropState = useSelector(state => state.dragDrop);

  const { dragFrom, draggedTask } = dragDropState;
  
  const classes = useStyles();

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
    className={classes.root}
    // className="tasks-container"
    onDrop={drop}
    onDragOver={allowDrop}
    >
      <Paper
        className={classes.paper}
        elevation={3}
      >
        <ColumnHeader columnName={props.columnName} />
        <List
          className={classes.list}
        >
          {tasks.map(task => (
            <Task
              columnName={props.columnName}
              task={task}
            />
          ))}
        </List>
      </Paper>
      <TaskInput
        columnName={props.columnName}
      />
    </Box>
  )
};

export default TaskColumn;
