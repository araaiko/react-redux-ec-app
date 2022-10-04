import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

// Import reducers
import { UsersReducer } from "../users/reducers";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

export const createStore = reduxCreateStore(
  combineReducers({
    router: routerReducer,
    users: UsersReducer,
  }),
  composeWithDevTools(applyMiddleware(routerMiddleware, thunk))
);

// export default function createStore() {
//   return reduxCreateStore(
//     combineReducers({
//       router: routerReducer,
//       users: UsersReducer,
//     }),
//     composeWithDevTools(applyMiddleware(routerMiddleware))
//   );
// }

export const history = createReduxHistory(createStore);
