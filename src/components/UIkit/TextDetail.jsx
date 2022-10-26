import React from "react";
import { Box, styled } from "@mui/material";

const CustomizedRowBox = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 16px;
`;
const CustomizedLabelBox = styled(Box)`
  margin-left: 0;
  margin-right: auto;
`;
const CustomizedValueBox = styled(Box)`
  margin-left: auto;
  margin-right: 0;
`;

const TextDetail = (props) => {
  return (
    <CustomizedRowBox component="div">
      <CustomizedLabelBox component="div">{props.label}</CustomizedLabelBox>
      <CustomizedValueBox component="div">{props.value}</CustomizedValueBox>
    </CustomizedRowBox>
  );
};

export default TextDetail;
