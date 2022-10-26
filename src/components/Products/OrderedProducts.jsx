import React, { useCallback } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material";
import { PrimaryButton } from "../UIkit";
import { useDispatch } from "react-redux";
import { push } from "redux-first-history";
import NoImage from "../../assets/img/src/no_image.png";

const CustomizedListItem = styled(ListItem)`
  background: #fff;
  height: auto;

  :not(:first-of-type) {
    margin-top: 2px;
  }
`;

const CustomizedImage = styled(Box)`
  object-fit: cover;
  margin: 8px 16px 8px 0;
  height: 96px;
  width: 96px;
`;

const CustomizedText = styled(Box)`
  width: 100%;
`;

const OrderedProducts = (props) => {
  const dispatch = useDispatch();
  const products = props.products;

  const goToProductDetail = useCallback((id) => {
    dispatch(push(`/product/${id}`));
    // eslint-disable-next-line
  }, []);

  return (
    <List>
      {products.map((product, index) => (
        <CustomizedListItem key={index}>
          <ListItemAvatar>
            <CustomizedImage
              component="img"
              src={product.images.length > 0 ? product.images[0].path : NoImage}
              alt={"商品画像"}
            />
          </ListItemAvatar>
          <CustomizedText component="div">
            <ListItemText
              primary={product.name}
              secondary={`サイズ：${product.size}`}
            />
            <ListItemText primary={`¥${product.price.toLocaleString()}`} />
          </CustomizedText>
          <PrimaryButton
            label={"商品詳細を見る"}
            onClick={() => goToProductDetail(product.id)}
          />
        </CustomizedListItem>
      ))}
    </List>
  );
};

export default OrderedProducts;
