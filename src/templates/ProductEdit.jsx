import React, { useCallback, useState } from "react";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations";
import ImageArea from "../components/Products/ImageArea";

const ProductEdit = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [images, setImages] = useState([]),
    [category, setCategory] = useState(""),
    [gender, setGender] = useState(""),
    [price, setPrice] = useState("");

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const categories = [
    {
      id: "tops",
      name: "トップス",
    },
    {
      id: "shirts",
      name: "シャツ",
    },
    {
      id: "pants",
      name: "パンツ",
    },
  ];

  const genders = [
    {
      id: "all",
      name: "すべて",
    },
    {
      id: "male",
      name: "メンズ",
    },
    {
      id: "female",
      name: "レディース",
    },
  ];

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          variant={"standard"}
          fullWidth={true}
          label={"商品名"}
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={"text"}
          onChange={inputName}
        />
        <TextInput
          variant={"standard"}
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          required={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={inputDescription}
        />
        <SelectBox
          variant={"standard"}
          label={"カテゴリー"}
          required={true}
          value={category}
          select={setCategory}
          options={categories}
        />
        <SelectBox
          variant={"standard"}
          label={"性別"}
          required={true}
          value={gender}
          select={setGender}
          options={genders}
        />
        <TextInput
          variant={"standard"}
          fullWidth={true}
          label={"価格"}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={"number"}
          onChange={inputPrice}
        />
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() =>
              dispatch(saveProduct(name, description, category, gender, price, images))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
