import * as Actions from "./actions";
import initialState from "../store/initialState";

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state, // 現在のStoreの状態
        ...action.payload, // Actionsから渡されたプレーンなobject これで現在のStoreの状態を上書きする（重複したもののみ）
      };
    case Actions.SIGN_OUT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
