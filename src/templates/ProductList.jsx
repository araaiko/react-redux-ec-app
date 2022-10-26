import React, { useEffect } from "react";
import { ProductCard } from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";
import { push } from "redux-first-history";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);

  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) ? query.split("?gender=")[1] : "";
  const category = /^\?category=/.test(query) ? query.split("?category=")[1] : "";

  useEffect(() => {
    dispatch(fetchProducts(gender, category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))
        ) : (
          <div className="u-position-center">
            <p>商品が登録されていません</p>
            <p className="u-click-text" onClick={() => dispatch(push("/product/edit"))}>
              商品を登録する
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
