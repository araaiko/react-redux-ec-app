import { db, FirebaseTimestamp } from "../../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  deleteDoc,
  writeBatch,
  where,
} from "firebase/firestore";
import { push } from "redux-first-history";
import { deleteProductAction, fetchProductsAction } from "./actions";

const productsRef = collection(db, "products");

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    deleteDoc(doc(db, "products", id)).then(() => {
      const prevProducts = getState().products.list;
      const nextProducts = prevProducts.filter((product) => product.id !== id); // 取得したlistの中から、filterで今回削除したid以外のidを抽出し配列に格納
      dispatch(deleteProductAction(nextProducts));
    });
  };
};

export const fetchProducts = (gender, category) => {
  return async (dispatch) => {
    // すべて表示
    let q = query(productsRef, orderBy("updated_at", "desc"));
    // 指定された性別で条件検索
    q =
      gender !== ""
        ? query(
            productsRef,
            where("gender", "==", gender),
            orderBy("updated_at", "desc")
          )
        : q;
    // 指定されたカテゴリーで条件検索
    q =
      category !== ""
        ? query(
            productsRef,
            where("category", "==", category),
            orderBy("updated_at", "desc")
          )
        : q;

    getDocs(q).then((snapshots) => {
      const productList = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        productList.push(product);
      });
      dispatch(fetchProductsAction(productList));
    });
  };
};

export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const timestamp = FirebaseTimestamp.now();

    let products = [],
      soldOutProducts = [];

    const batch = writeBatch(db);

    for (const product of productsInCart) {
      const snapshot = await getDoc(doc(db, "products", product.productId));
      const sizes = snapshot.data().sizes;

      // 在庫数を更新した配列を作成
      const updatedSizes = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            // カートには追加したが、先に購入されて在庫が0になってしまった場合
            soldOutProducts.push(product.name);
            return size;
          }
          return {
            size: size.size,
            quantity: size.quantity - 1,
          };
        } else {
          return size;
        }
      });

      // 注文履歴で表示するデータ
      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      // firestoreの在庫数データを更新
      batch.update(doc(db, "products", product.productId), {
        sizes: updatedSizes,
      });

      // firestoreのuserから購入した商品を削除
      batch.delete(doc(db, "users", uid, "cart", product.cartId));
    }

    if (soldOutProducts.length > 0) {
      // 在庫0の商品がカートに入っていた場合
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join("と")
          : soldOutProducts[0];

      alert(
        `大変申し訳ありません。${errorMessage}が在庫切れとなったため、注文処理を中断しました。`
      );
      return false;
    } else {
      // カート内の商品の在庫が確保できた場合
      batch
        .commit()
        .then(() => {
          // 注文処理完了後、注文履歴をfirestoreに作成
          const orderRef = doc(collection(db, "users", uid, "orders"));
          const id = orderRef.id;
          // 配送日設定
          const date = timestamp.toDate(); // toDate()でjsのDate型に変換
          const shippingDate = FirebaseTimestamp.fromDate(
            new Date(date.setDate(date.getDate() + 3))
          );

          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp,
          };

          setDoc(doc(db, "users", uid, "orders", id), history);

          dispatch(push("/order/complete"));
        })
        .catch(() => {
          alert(
            "注文処理に失敗しました。通信環境をご確認のうえ、もう一度お試しください。"
          );
        });
    }
  };
};

export const saveProduct = (
  id,
  name,
  description,
  category,
  gender,
  price,
  images,
  sizes
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now(); // 現在のサーバーの時刻をタイムスタンプ型として取得

    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10), // 渡される値が文字列なので、parseIntメソッドで数値化（10 = 10進数のこと）
      sizes: sizes,
      updated_at: timestamp,
    };

    // 新規作成
    if (id === "") {
      const ref = doc(productsRef); // 新しくデータを作成（自動採番）
      id = ref.id; // 自動採番したidを取得、格納
      data.id = id; // 上記const data にidを追加
      data.created_at = timestamp; // 新規作成時のtimestampを上記 const data に追加
    }

    return setDoc(doc(db, "products", id), data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
