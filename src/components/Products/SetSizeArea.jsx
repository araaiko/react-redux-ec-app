import React, { useState, useCallback, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  styled,
} from "@mui/material"; // Paperはテーマみたいなもの（？）
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // MUIのicon
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextInput } from "../UIkit";

const CustomizedTableCell = styled(TableCell)`
  width: 48px;
  height: 48px;
`;
const CustomizedIconButton = styled(IconButton)`
  width: 48px;
  height: 48px;
`;
const CustomizedIconButtonFloatRight = styled(IconButton)`
  float: right;
`;

const SetSizeArea = (props) => {
  const [index, setIndex] = useState(0),
    [size, setSize] = useState(""),
    [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value);
    },
    [setSize]
  );

  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value);
    },
    [setQuantity]
  );

  const addSize = (index, size, quantity) => {
    if (size === "" || quantity === "") {
      // Required input is blank
      return false;
    } else {
      if (index === props.sizes.length) {
        // new add
        props.setSizes((prevState) => [
          ...prevState,
          { size: size, quantity: quantity },
        ]);
        setIndex(index + 1);
        setSize("");
        setQuantity(0);
      } else {
        // edit
        const newSizes = props.sizes;
        newSizes[index] = { size: size, quantity: quantity };
        props.setSizes(newSizes); // newSizesで配列をまるっと更新
        setIndex(newSizes.length);
        setSize("");
        setQuantity(0);
      }
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
    props.setSizes(newSizes);
    setIndex(newSizes.length);
  };

  useEffect(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <CustomizedTableCell />
              <CustomizedTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <CustomizedIconButton
                      onClick={() => editSize(i, item.size, item.quantity)}
                    >
                      <EditIcon />
                    </CustomizedIconButton>
                  </TableCell>
                  <TableCell>
                    <CustomizedIconButton onClick={() => deleteSize(i)}>
                      <DeleteIcon />
                    </CustomizedIconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <TextInput
            variant={"standard"}
            fullWidth={false}
            label={"サイズ"}
            multiline={false}
            required={true}
            onChange={inputSize}
            rows={1}
            value={size}
            type={"text"}
          />
          <TextInput
            variant={"standard"}
            fullWidth={false}
            label={"数量"}
            multiline={false}
            required={true}
            onChange={inputQuantity}
            rows={1}
            value={quantity}
            type={"number"}
          />
        </div>
        <CustomizedIconButtonFloatRight
          onClick={() => addSize(index, size, quantity)}
        >
          <CheckCircleIcon />
        </CustomizedIconButtonFloatRight>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
