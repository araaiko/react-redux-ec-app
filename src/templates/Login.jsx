import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { push } from "redux-first-history";
// import { signInAction } from "../reducks/users/actions";
import { signIn } from "../reducks/users/operations";

const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  console.log(selector.users);

  return (
    <div>
      <h2>ログイン</h2>
      <button
        onClick={() => {
          dispatch(signIn());
          //   dispatch(signInAction({ uid: "0001", username: "hosen" }));
          //   dispatch(push("/"));
        }}
      >
        ログインする
      </button>
    </div>
  );
};

export default Login;
