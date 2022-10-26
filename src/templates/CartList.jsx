import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, ListItemText, styled } from "@mui/material";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/Products";
import { PrimaryButton, GreyButton } from "../components/UIkit";
import { push } from "redux-first-history";

const CustomizedList = styled(List)`
  width: 100%;
  max-width: 512px;
  margin: 0 auto;
`;

const CartList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ショッピングカート</h2>
      <CustomizedList>
        {productsInCart.length > 0 ? (
          productsInCart.map((product) => (
            <CartListItem key={product.cartId} product={product} />
          ))
        ) : (
          <ListItem>
            <ListItemText
              sx={{
                textAlign: "center",
              }}
              primary={"カートに商品がありません"}
            />
          </ListItem>
        )}
      </CustomizedList>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
        <div className="module-spacer--extra-extra-small" />
        <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
