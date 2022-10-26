import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db, FirebaseTimestamp } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { styled } from "@mui/material";
import { returnCodeToBr } from "../function/common";
import { ImageSwiper2, SizeTable } from "../components/Products";
import { addProductToCart } from "../reducks/users/operations";

const CustomizedSliderBox = styled("div")(
  ({ theme }) => `
    ${[theme.breakpoints.down("sm")]} {
        margin: 0 auto 24px auto;
        height: 320px;
        width: 320px;
    }
    ${[theme.breakpoints.up("sm")]} {
        margin: 0 auto;
        height: 400px;
        width: 400px;
    }
`
);
const CustomizedDetail = styled("div")(
  ({ theme }) => `
    text-align: left;
      ${[theme.breakpoints.down("sm")]} {
        margin: 0 auto 16px auto;
        height: auto;
        width: 320px;
    }
    ${[theme.breakpoints.up("sm")]} {
        margin: 0 auto;
        height: auto;
        width: 400px;
    }
`
);
const CustomizedPrice = styled("p")`
  font-size: 36px;
`;

const ProductDetail = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/product/")[1];

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getDoc(doc(db, "products", id)).then((doc) => {
      const data = doc.data();
      setProduct(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = useCallback(
    (selectedSize) => {
      const timestamp = FirebaseTimestamp.now();
      dispatch(
        addProductToCart({
          added_at: timestamp,
          description: product.description,
          gender: product.gender,
          images: product.images,
          name: product.name,
          price: product.price,
          productId: product.id,
          quantity: 1,
          size: selectedSize,
        })
      );
    },
    // eslint-disable-next-line
    [product]
  );

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <CustomizedSliderBox>
            <ImageSwiper2 images={product.images} />
          </CustomizedSliderBox>
          <CustomizedDetail>
            <h2 className="u-text__headline">{product.name}</h2>
            <CustomizedPrice>{product.price.toLocaleString()}</CustomizedPrice>
            <div className="module-spacer--small" />
            <SizeTable addProduct={addProduct} sizes={product.sizes} />
            <div className="module-spacer--small" />
            <p>{returnCodeToBr(product.description)}</p>
          </CustomizedDetail>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
