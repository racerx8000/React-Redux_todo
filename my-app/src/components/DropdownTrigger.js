import React, { useState } from "react";
import ColorMenu from "./ColorMenu";
import { Button, makeStyles, Zoom } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    minWidth: "10px",
    maxWidth: "22px",
    minHeight: "11px",
    maxHeight: "22px",
    padding: "0px",
    marginTop: "54%"
  },
})

function DropdownTrigger(props) {
  const classes = useStyles();
  const { id, color, columnName } = props;
  const [showColorMenu, setShowColorMenu] = useState(false);

  return(
    <Button
      variant="contained"
      onClick={() => setShowColorMenu(prev => !prev)}
      className={classes.root}
      // className="dropdown-trigger"
      style={{backgroundColor: color}}
      >
      <Zoom in={showColorMenu}>
        <div>
          <ColorMenu
            toggleMenu={setShowColorMenu}
            taskId={id}
            columnName={columnName}
          />
        </div>
      </Zoom>
    </Button>
  )
}

export default DropdownTrigger;