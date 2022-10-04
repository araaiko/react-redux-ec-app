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
      isSignedIn: false,
      role: "",
      uid: "",
      username: "",
    },
  };
};
