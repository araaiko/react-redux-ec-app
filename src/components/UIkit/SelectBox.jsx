import React from "react";
import { InputLabel, MenuItem, FormControl, Select, styled } from "@mui/material";

const CustomizedFormControl = styled(FormControl)`
    margin-bottom: 16px;
    min-width: 128px;
    width: 100%;
`

const SelectBox = (props) => {
  return (
    <CustomizedFormControl variant={props.variant}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={props.value}
        onChange={(event) => props.select(event.target.value)}
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </CustomizedFormControl>
  );
};

export default SelectBox;
