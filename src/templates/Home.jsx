import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, getUsername } from "../reducks/users/selectors";
import { isSignOut } from "../reducks/users/operations";

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);

  return (
    <>
      <h2>Home</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
      <button onClick={() => dispatch(isSignOut())}>SIGN OUT</button>
    </>
  );
};

export default Home;
