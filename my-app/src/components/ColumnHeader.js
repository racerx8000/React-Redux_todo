import React from "react";
import '@fontsource/roboto';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    color: "#b8b8b8",
    textAlign: "center"
  }
})

function ColumnHeader(props) {
  const classes = useStyles();
  return (
    <Typography
      className={classes.root}
      variant="h2"
    >
      {props.columnName}
    </Typography>
  )
}

export default ColumnHeader;
