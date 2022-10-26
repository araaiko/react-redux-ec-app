import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  styled,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CustomizedTableCell = styled(TableCell)`
  padding: 0;
  width: 48px;
  height: 48px;
`;

const SizeTable = (props) => {
  const sizes = props.sizes;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((size) => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>残り{size.quantity}点</TableCell>
                <CustomizedTableCell>
                  {size.quantity > 0 ? (
                    <IconButton onClick={() => props.addProduct(size.size)}>
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <p>売切</p>
                  )}
                </CustomizedTableCell>
                <CustomizedTableCell>
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </CustomizedTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
