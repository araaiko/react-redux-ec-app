import React, { useEffect } from "react";
import { IconButton, Badge, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { getProductsInCart, getUserId } from "../../reducks/users/selectors";
import { db } from "../../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { fetchProductsInCart } from "../../reducks/users/operations";
import { push } from "redux-first-history";

const CustomizedIconButton = styled(IconButton)`
  margin-left: 10px;
`;

const HeaderMenus = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  let productsInCart = getProductsInCart(selector);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users", uid, "cart"),
      (snapshots) => {
        // snapshots：cartサブコレクションにあるデータ全て
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInCart.push(product); // productsInCartは配列なのでpushがいける
              break;
            case "modified":
              // findIndex()：配列を一つずつ調べていくメソッド。map関数やfilterメソッドと似ている。
              // 変更が加わったものがproductsInCart配列の何番目の要素かを調べてindexに格納
              const index = productsInCart.findIndex(
                (product) => product.cartId === change.doc.id
              );
              // 上記で調べた要素をproductで上書き
              productsInCart[index] = product;
              break;
            case "removed":
              // eslint-disable-next-line
              productsInCart = productsInCart.filter(
                (product) => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductsInCart(productsInCart));
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <>
      <CustomizedIconButton onClick={() => dispatch(push("/cart"))}>
        <Badge badgeContent={productsInCart.length} color="warning">
          <ShoppingCartIcon />
        </Badge>
      </CustomizedIconButton>
      <CustomizedIconButton>
        <FavoriteBorderIcon />
      </CustomizedIconButton>
      <CustomizedIconButton
        onClick={(event) => props.handleDrawerToggle(event)}
      >
        <MenuIcon />
      </CustomizedIconButton>
    </>
  );
};

export default HeaderMenus;
