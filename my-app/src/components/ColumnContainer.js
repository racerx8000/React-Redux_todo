import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import TaskColumn from "./TaskColumn";


// const useStyles = makeStyles({
//   root: {
//     display: flex,
//     flexFlow: row,
//     justifyContent: space-around
  
//   }
// })

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    color: theme.palette.info
  }
}))


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
      display="flex"
      flexDirection="row"
      justifyContent="center"
      mt={10}
    >
      {Object.keys(todoList).map(column => (
          <TaskColumn
            columnName={column}
            // drop={drop}
            // dropToColumn={dropToColumn}
            // drag={drag}
            // dragEnd={dragEnd}
          />
      ))}
    </Box>
);
}

export default ColumnContainer;
