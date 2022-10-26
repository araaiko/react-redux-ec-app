import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import { Box, Divider, List, styled } from "@mui/material";
import { CartListItem } from "../components/Products";
import { PrimaryButton, TextDetail } from "../components/UIkit";
import { orderProduct } from "../reducks/products/operations";

const CustomizedDetailBox = styled(Box)(
  ({ theme }) => `
    margin: 0 auto;
    ${[theme.breakpoints.down("sm")]} {
        width: 320px;
    }
    ${[theme.breakpoints.up("sm")]} {
        width: 512px;
    }
`
);
const CustomizedOrderBox = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: 0 4px 2px 2px rgba(0, 0, 0, 0.2);
  height: 256px;
  margin: 24px auto 16px auto;
  padding: 16px;
  width: 288px;
`;

const OrderConfirm = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productsInCart]);

  const tax = useMemo(() => {
    return subtotal * 0.1;
  }, [subtotal]);

  const shippingFee = useMemo(() => {
    return subtotal >= 10000 ? 0 : 210;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + shippingFee + tax;
  }, [subtotal, shippingFee, tax]);

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total));
  }, [productsInCart, total]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <CustomizedDetailBox component="div">
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product) => (
                <CartListItem key={product.cartId} product={product} />
              ))}
          </List>
        </CustomizedDetailBox>
        <CustomizedOrderBox>
          <TextDetail
            label={"商品合計"}
            value={`¥${subtotal.toLocaleString()}`}
          />
          <TextDetail label={"消費税"} value={`¥${tax.toLocaleString()}`} />
          <TextDetail
            label={"送料"}
            value={`¥${shippingFee.toLocaleString()}`}
          />
          <Divider />
          <TextDetail
            label={"合計(税込)"}
            value={`¥${total.toLocaleString()}`}
          />
          <PrimaryButton label={"注文する"} onClick={order} />
        </CustomizedOrderBox>
      </div>
    </section>
  );
};

export default OrderConfirm;
