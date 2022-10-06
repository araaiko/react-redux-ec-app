import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, ProductEdit, Reset, SignIn, SignUp, Test } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Routes>
      {/* exact：pathの値とピッタリ一致していたら Switchとセットで使う pathを動的に変更する場合はexactはいらない */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signin/reset" element={<Reset />} />

      <Route element={<Auth />}>
        <Route index element={<Home />} />
        <Route path="/product/edit" element={<ProductEdit />} />
        <Route path="/test" element={<Test />} />
      </Route>
    </Routes>
  );
};

export default Router;
