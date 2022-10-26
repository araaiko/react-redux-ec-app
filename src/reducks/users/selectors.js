import { createSelector } from "reselect";

// Store全体で管理しているstateの中からusersを参照し、それをusersSelectorに格納
const usersSelector = (state) => state.users; // (state):Store全体で管理しているstate

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

export const getOrdersHistory = createSelector(
  [usersSelector],
  (state) => state.orders
);

export const getProductsInCart = createSelector(
  [usersSelector],
  (state) => state.cart
);

export const getUserId = createSelector(
  [usersSelector],
  (state) => state.uid // state: usersSelectorが返す値＝state.usersのこと
);

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.username
);
