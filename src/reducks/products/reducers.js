import * as Actions from "./actions";
import initialState from "../store/initialState";

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        list: [...action.payload], // [...〜]とすることで、reduxのstoreで持っているメモリー情報が書き換わり、新しい配列として扱ってくれる
      };
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload], // [...〜]とすることで、reduxのstoreで持っているメモリー情報が書き換わり、新しい配列として扱ってくれる
      };
    default:
      return state;
  }
};
