import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, ListItemText, styled } from "@mui/material";
import { getOrdersHistory } from "../reducks/users/selectors";
import { fetchOrdersHistory } from "../reducks/users/operations";
import { OrderHistoryItem } from "../components/Products";

const CustomizedList = styled(List)(
  ({ theme }) => `
    background: ${theme.palette.grey["100"]};
    margin: 0 auto;
    padding: 32px;
    ${[theme.breakpoints.down("md")]} {
        width: 100%;
    }
    ${[theme.breakpoints.up("md")]} {
        width: 768px;
    }
`
);

const OrderHistory = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const orders = getOrdersHistory(selector);

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  }, []);

  return (
    <section className="c-section-wrapin">
      <CustomizedList>
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderHistoryItem order={order} key={order.id} />
          ))
        ) : (
          <ListItem>
            <ListItemText primary={"注文履歴がありません"} />
          </ListItem>
        )}
      </CustomizedList>
    </section>
  );
};

export default OrderHistory;
