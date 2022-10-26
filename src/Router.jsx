import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CartList,
  OrderConfirm,
  OrderHistory,
  ProductDetail,
  ProductEdit,
  ProductList,
  Reset,
  SignIn,
  SignUp,
  Test,
} from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Routes>
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signin/reset" element={<Reset />} />

      <Route path="/" element={<Auth />}>
        <Route index element={<ProductList />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="product/edit" element={<ProductEdit />} />
        <Route path="product/edit/:id" element={<ProductEdit />} />

        <Route path="cart" element={<CartList />} />
        <Route path="order/confirm" element={<OrderConfirm />} />
        <Route path="order/history" element={<OrderHistory />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
};

export default Router;
