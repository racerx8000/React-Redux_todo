import React, { useState } from "react";
import ColorMenu from "./ColorMenu";
import { Box, makeStyles, Zoom } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "1px solid rgb(71, 71, 71)",
    opacity: "0.95"
  }
})

function DropdownTrigger(props) {
  const classes = useStyles();
  const { id, color, columnName } = props;
  const [showColorMenu, setShowColorMenu] = useState(false);

  return(
    <div>
      <Box
        component="div"
        className={classes.root}
        // className="dropdown-trigger"
        style={{backgroundColor: color}}
      >
      </Box>
      <Zoom in={false}>
        <div
          onMouseOver={() => setShowColorMenu(prev => !prev)}
          onMouseLeave={() => setShowColorMenu(prev => !prev)}
        >
          <ColorMenu
            taskId={id}
            columnName={columnName}
          />
        </div>
        {/* <h3>yo</h3> */}
      </Zoom>
    </div>
  )
}

export default DropdownTrigger;