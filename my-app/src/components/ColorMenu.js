import React from "react";
import { useDispatch } from "react-redux";
import { taskSetNewColor } from "../redux/features/todos/todosReducer";

const colors = {
  red: '#f00e1a',
  green: '#16f50f',
  blue: '#0f41f5',
  purple: '#9c57e6',
  black: '#000000',
};


function ColorMenu(props) {
  const dispatch = useDispatch();
  const { taskId, columnName } = props;
  // const taskId = props.id;
  // const columnName = props.columnName;

  return (
    <div style={{
      position: "absolute",
      backgroundColor: "#d4d1d1",
    }}
      // className="dropdown-content"
    >
      {Object.values(colors).map(color => (
        <p 
          style={{
            backgroundColor: color,
            padding: "15px",
            borderRadius: "3px",
            display: "block"
          
          }}
          onClick={() => dispatch(taskSetNewColor({ taskId, columnName, color }))}
        />
      ))}
    </div>
  )
}

export default ColorMenu;
