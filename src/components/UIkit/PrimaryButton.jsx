import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomizedButton = styled(Button)`
  background-color: #4dd0e1;
  color: #000;
  font-size: 16px;
  height: 48px;
  margin-bottom: 16px;
  width: 256px;

  :hover {
    background-color: #0097a7;
    color: #fff;
  }
`;

const PrimaryButton = (props) => {
  return (
    <CustomizedButton variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </CustomizedButton>
  );
};

export default PrimaryButton;
