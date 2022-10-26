export const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
export const fetchOrdersHistoryAction = (history) => {
  return {
    type: "FETCH_ORDERS_HISTORY",
    payload: history,
  };
};

export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductsInCartAction = (products) => {
  return {
    type: "FETCH_PRODUCTS_IN_CART",
    payload: products,
  };  
};  

export const SIGN_IN = "SIGN_IN"; // このActionがどんなaction typeかをreducersでは認識しておきたい。だからここでexportして、reducersでimportできるようにしている。
export const signInAction = (userState) => {
  // ↑ユーザーのアクションで呼び出されるようexportしている
  return {
    type: "SIGN_IN", // 冒頭に記述した定数の値と同じものを記述
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  // サインアウト（ログアウト）ではデータを初期値に戻すだけなので、引数はいらない
  return {
    type: "SIGN_OUT",
    payload: {
      cart: [],
      isSignedIn: false,
      orders: [],
      role: "",
      uid: "",
      username: "",
    },
  };
};
