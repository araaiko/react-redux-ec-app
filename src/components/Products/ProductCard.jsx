import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import NoImage from "../../assets/img/src/no_image.png";
import { push } from "redux-first-history";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteProduct } from "../../reducks/products/operations";

const CustomizedCard = styled(Card)(
  ({ theme }) => `

    ${[theme.breakpoints.down("sm")]} {
        margin: 8px;
        width: calc(50% - 16px);
    }

    ${[theme.breakpoints.up("sm")]} {
        margin: 16px;
        width: calc(100% / 3 - 32px);
    }
  `
);
const CustomizedCardContent = styled(CardContent)`
  display: flex;
  justify-content: space-between;
  padding: 16px 8px;
  text-align: left;
  &:last-child {
    padding-bottom: 16px;
  }
`;
const CustomizedCardMedia = styled(CardMedia)`
  height: 0;
  padding-top: 100%;
`;
const CustomizedPrice = styled(Typography)(
  ({ theme }) => `
    color: ${[theme.palette.warning.main]};
    font-size: 16px;
    `
);
const CustomizedIconButton = styled(IconButton)`
  width: 48px;
  height: 48px;
`;

const ProductCard = (props) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const images = props.images.length > 0 ? props.images : [{ path: NoImage }];
  const price = props.price.toLocaleString(); // 引数なしだと、12,000のように3桁区切りで,をつけてくれる

  return (
    <CustomizedCard>
      <CustomizedCardMedia
        image={images[0].path}
        onClick={() => dispatch(push(`/product/${props.id}`))}
      />
      <CustomizedCardContent>
        <div onClick={() => dispatch(push(`/product/${props.id}`))}>
          <Typography color="text.secondary" component="p">
            {props.name}
          </Typography>
          <CustomizedPrice component="p">¥{price}</CustomizedPrice>
        </div>
        <CustomizedIconButton onClick={handleClick} id="menu-button">
          <MoreVertIcon />
        </CustomizedIconButton>
        <Menu
          aria-labelledby="menu-button"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => {
              dispatch(push(`/product/edit/${props.id}`));
              handleClose();
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id));
              handleClose();
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CustomizedCardContent>
    </CustomizedCard>
  );
};

export default ProductCard;
