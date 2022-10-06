import { IconButton, styled } from "@mui/material";
import React, { useCallback } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";
import ImagePreview from "./ImagePreview";

const CustomizedIconButton = styled(IconButton)`
  height: 48px;
  width: 48px;
`;

const ImageArea = (props) => {

    const deleteImage = useCallback(
      async (id) => {
        const ret = window.confirm("この画像を削除しますか？");
        if (!ret) {
          return false;
        } else {
          const newImages = props.images.filter((image) => image.id !== id); // 削除する画像以外をfilter()で選別し、newImagesに格納
          props.setImages(newImages); // 更新関数にセットして、stateを更新
          return deleteObject(ref(storage, `images/${id}`)); // storageからも該当画像を削除
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.images]
    );

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      let blob = new Blob(file, { type: "image/jepg" });

      // Generate random 16 digits strings
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      // add Firebase Storage
      const uploadRef = ref(storage, `images/${fileName}`);

      uploadBytes(uploadRef, blob).then(() => {
        // ▼アップロードが完了した後に実行する処理
        getDownloadURL(uploadRef).then((downloadURL) => {
          const newImage = {
            id: fileName,
            path: downloadURL,
          };
          // ProductEdit.jsxに後ほどuseStateでsetImagesを作成予定。そこにnewImageを追加していくイメージ
          props.setImages((prevState) => [...prevState, newImage]); // マーカー：prevStateで更新前のstateを使える！
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.setImages]
  );

  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 &&
          props.images.map((image) => (
            <ImagePreview
              delete={deleteImage}
              id={image.id}
              path={image.path}
              key={image.id}
            />
          ))}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <CustomizedIconButton>
          <label>
            <AddPhotoAlternateIcon />
            <input
              className="u-display-none"
              type="file"
              id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </CustomizedIconButton>
      </div>
    </div>
  );
};

export default ImageArea;
