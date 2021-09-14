import React from "react";
import { useDispatch } from "react-redux";
import { taskSetNewColor } from "../redux/features/todos/todosReducer";
import { ButtonGroup, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  dropdown: {
    backgroundColor: "rgba(176, 190, 197, 0.5)",
    borderRadius: "calc(0.5 * 100px)",
    position: "absolute",
    zIndex: "1"
  },
  dropdownItem: {
    padding: "15px",
    margin: "12px",
    borderRadius: "50%",
    display: "block",
    width: "22px",
    minWidth: "10px",
    maxWidth: "22px",
    height: "22px",
    background: props => props.color,
    zIndex: "2"
  }
})

const colors = {
  red: '#F93636',
  green: '#5BEE33',
  blue: '#1984F5',
  purple: '#655DFF',
};

function ColorButton(props) {
  const classes = useStyles(props);
  const { taskId, columnName, color } = props;
  return (
    <Button
      variant="contained"
      className={classes.dropdownItem}
      onClick={() => props.applyColor(taskId, columnName, color)}
    />
  )
}


function ColorMenu(props) {
  const { taskId, columnName } = props;
  const classes = useStyles();
  const dispatch = useDispatch();


  function applyColor(taskId, columnName, color) {
    dispatch(taskSetNewColor({ taskId, columnName, color }))
  }

  return (
    <ButtonGroup
      className={classes.dropdown}
      orientation="vertical"
      variant="contained"
    >
      {Object.values(colors).map(color => (
        <ColorButton
          toggleMenu={props.toggleMenu}
          taskId={taskId}
          columnName={columnName}
          color={color}
          applyColor={applyColor}
        />
      ))}
    </ButtonGroup>
  )
}
  
export default ColorMenu;
