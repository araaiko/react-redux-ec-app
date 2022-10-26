import React from "react";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  styled,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import NoImage from "../../assets/img/src/no_image.png";

const CustomizedListItem = styled(ListItem)`
  height: 128px;
`;

const CustomizedImage = styled(Box)`
  object-fit: cover;
  margin: 16px;
  height: 96px;
  width: 96px;
`;

const CustomizedText = styled(Box)`
  width: 100%;
`;

const CartListItem = (props) => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  const image =
    props.product.images.length > 0 ? props.product.images[0].path : NoImage;
  const name = props.product.name;
  const price = props.product.price.toLocaleString();
  const size = props.product.size;

  const removeProductFromCart = (id) => {
    return deleteDoc(doc(db, "users", uid, "cart", id));
  };

  return (
    <>
      <CustomizedListItem>
        <ListItemAvatar>
          <CustomizedImage component="img" src={image} alt="商品画像" />
        </ListItemAvatar>
        <CustomizedText component="div">
          <ListItemText primary={name} secondary={`サイズ：${size}`} />
          <ListItemText primary={`¥${price}`} />
        </CustomizedText>
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </CustomizedListItem>
      <Divider />
    </>
  );
};

export default CartListItem;
