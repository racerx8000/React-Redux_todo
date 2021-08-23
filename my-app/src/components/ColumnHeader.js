import React from "react";
import '@fontsource/roboto';
import Typography from "@material-ui/core/Typography";


function ColumnHeader(props) {
  return (
    <Typography
      variant="h2"

      // className="column-header
    >
      {props.columnName}
    </Typography>
  )
}

export default ColumnHeader;
