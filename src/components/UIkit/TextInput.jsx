import React from "react";
import { TextField } from "@mui/material";

const TextInput = (props) => {
  return (
    <TextField
      variant={props.variant}
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  );
};

export default TextInput;
