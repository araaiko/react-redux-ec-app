import {
  signInAction,
  signOutAction,
  fetchProductsInCartAction,
  fetchOrdersHistoryAction,
} from "./actions";
import { push } from "redux-first-history";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import {
  isValidEmailFormat,
  isValidRequiredInput,
} from "../../function/common";

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const cartRef = doc(collection(db, "users", uid, "cart")); // usersコレクションのuidに、cartサブコレクションを作成（doc()で自動採番）
    const id = cartRef.id; // 採番したidを格納
    addedProduct["cartId"] = cartRef.id; // 採番したidをcartIdにも格納
    await setDoc(doc(db, "users", uid, "cart", id), addedProduct);
    dispatch(push("/"));
  };
};

export const fetchOrdersHistory = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const list = [];

    const ordersRef = collection(db, "users", uid, "orders");
    const q = query(ordersRef, orderBy("updated_at", "desc"));

    getDocs(q).then((snapshots) => {
      snapshots.forEach((snapshot) => {
        const data = snapshot.data();

        list.push(data);
      });
      dispatch(fetchOrdersHistoryAction(list));
    });
  };
};

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products));
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // userがサインインしている(認証されている)場合、データベースからuser情報を取得し、reduxのstoreを更新する
        // 利用可能なプロパティの一覧はdocsを参照
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        getDoc(doc(db, "users", uid)).then((snapshot) => {
          const data = snapshot.data();

          dispatch(
            signInAction({
              isSignedIn: true,
              role: data.role,
              uid: uid,
              username: data.username,
            })
          );
        });
      } else {
        // userがサインアウトしている(=nullが返された)場合、サインインページを表示
        dispatch(push("/signin"));
      }
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    // Validation
    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。もう1度お試しください。");
      return false;
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert(
            "入力されたアドレス宛にパスワードリセット用のメールをお送りしました。"
          );
          dispatch(push("/signin"));
        })
        .catch(() => {
          alert(
            "パスワードリセットに失敗しました。通信環境をご確認のうえ、もう1度お試しください。"
          );
        });
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    // Validation
    if (!isValidRequiredInput(email, password)) {
      alert("必須項目が未入力です");
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。もう1度お試しください。");
      return false;
    }

    if (password.length < 6) {
      alert("パスワードは6文字以上で入力してください。");
      return false;
    }

    return signInWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;
      if (user) {
        const uid = user.uid;

        getDoc(doc(db, "users", uid)).then((snapshot) => {
          const data = snapshot.data();
          dispatch(
            signInAction({
              isSignedIn: true,
              role: data.role,
              uid: uid,
              username: data.username,
            })
          );
          dispatch(push("/"));
        });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // Validation
    // if (
    //   username === "" ||
    //   email === "" ||
    //   password === "" ||
    //   confirmPassword === ""
    // ) {
    //   alert("必須項目が未入力です");
    //   return false;
    // }
    if (!isValidRequiredInput(username, email, password, confirmPassword)) {
      alert("必須項目が未入力です");
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。もう1度お試しください。");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう1度お試しください。");
      return false;
    }

    if (password.length < 6) {
      alert("パスワードは6文字以上で入力してください。");
      return false;
    }

    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
          };

          setDoc(doc(db, "users", uid), userInitialData).then(() => {
            dispatch(push("/"));
          });
        }
      }
    );
  };
};

export const isSignOut = () => {
  return async (dispatch) => {
    signOut(auth).then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};
