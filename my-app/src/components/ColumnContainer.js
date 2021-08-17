import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import TaskColumn from "./TaskColumn";

function ColumnContainer() {
  const todoList = useSelector(state => state.todoList);

  useEffect(() => {
    const temp = JSON.stringify(todoList);
    localStorage.setItem("todoList", temp)
  }, [todoList])
  // const [draggedTask, setDraggedTask] = useState({});
  // const [dragFromColumn, setDragFromColumn] = useState([]);
  // const [dropToColumn, setDropToColumn] = useState([]);
  
  // function drag(id, dragFrom) {
  //   const draggedItem = state[dragFrom].find(task => {
  //     return task.id === id;
  //   })

  //   setDraggedTask(draggedItem);
  //   setDragFromColumn(dragFrom);
  // }

  // function drop(dropTo) {
  //   const draggedItem = state[dropTo].concat(draggedTask);
  //   if (dropTo !== dragFromColumn) {
  //     setTodos({ ...state, [dropTo]: draggedItem });
  //     setDragFromColumn([]);
  //   }
    
  //   setDropToColumn(dropTo);
  //   setDraggedTask({});
  // }

  // function dragEnd(id, dragFrom, dropTo) {
    // const restOfTasks = state[dragFrom].filter(task => {
    //   return task.id !== id;
    // });
    // if (dragFrom !== dropTo) {
    //   setTodos({ ...state, [dragFrom]: restOfTasks });
    // }
  // }

  return(
    <div className="task-column-wrapper">
      {Object.keys(todoList).map(column => (
          <TaskColumn
            columnName={column}
            // drop={drop}
            // dropToColumn={dropToColumn}
            // drag={drag}
            // dragEnd={dragEnd}
          />
      ))}
    </div>
  );
}

export default ColumnContainer;
