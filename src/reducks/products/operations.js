import { db, FirebaseTimestamp } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { push } from "redux-first-history";

const productsRef = collection(db, "products");

export const saveProduct = (name, description, category, gender, price, images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now(); // 現在のサーバーの時刻をタイムスタンプ型として取得

        const data = {
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            price: parseInt(price, 10), // 渡される値が文字列なので、parseIntメソッドで数値化（10 = 10進数のこと）
            updated_at: timestamp
        }

        const ref = doc(productsRef); // 新しくデータを作成（自動採番）
        const id = ref.id; // 自動採番したidを取得、格納
        data.id = id; // 上記const data にidを追加
        data.created_at = timestamp; // 新規作成時のtimestampを上記 const data に追加

        return setDoc(doc(db, "products", id), data).then(() => {
            dispatch(push("/"));
        }).catch((error) => {
            throw new Error(error);
        })
    }
}