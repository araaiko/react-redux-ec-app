import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomizedButton = styled(Button)(
  ({ theme }) =>
    `
    background-color: ${[theme.palette.grey["300"]]};
    color: #000;
    font-size: 16px;
    height: 48px;
    margin-bottom: 16px;
    width: 256px;
  
    :hover {
      background-color: #0097a7;
      color: #fff;
    }
  `
);

const GreyButton = (props) => {
  return (
    <CustomizedButton variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </CustomizedButton>
  );
};

export default GreyButton;
