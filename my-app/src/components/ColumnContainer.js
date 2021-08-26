import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import TaskColumn from "./TaskColumn";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "400px"
  }
})

function ColumnContainer() {
  const todoList = useSelector(state => state.todoList);
  const classes = useStyles();

  useEffect(() => {
    const temp = JSON.stringify(todoList);
    localStorage.setItem("todoList", temp)
  }, [todoList])

  return(
    <Box 
      className={classes.root}
    >
      {Object.keys(todoList).map(column => (
        <TaskColumn
          columnName={column}
        />
      ))}
    </Box>
  );
}

export default ColumnContainer;
