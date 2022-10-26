import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations";
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { ImageArea, SetSizeArea } from "../components/Products";

const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/product/edit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [images, setImages] = useState([]),
    [category, setCategory] = useState(""),
    [categories, setCategories] = useState([]),
    [gender, setGender] = useState(""),
    [price, setPrice] = useState(""),
    [sizes, setSizes] = useState([]);

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

  // const categories = [
  //   {
  //     id: "tops",
  //     name: "トップス",
  //   },
  //   {
  //     id: "shirts",
  //     name: "シャツ",
  //   },
  //   {
  //     id: "pants",
  //     name: "パンツ",
  //   },
  // ];

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

  useEffect(() => {
    if (id !== "") {
      getDoc(doc(db, "products", id)).then((snapshot) => {
        const product = snapshot.data();
        setImages(product.images);
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setGender(product.gender);
        setPrice(product.price);
        setSizes(product.sizes);
      });
    }
  }, [id]);

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("order", "asc"));

    getDocs(q).then((snapshots) => {
      const list = [];

      snapshots.forEach((snapshot) => {
        const data = snapshot.data();
        list.push({
          id: data.id,
          name: data.name,
        });
      });

      setCategories(list);
    });
  }, []);

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
        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
