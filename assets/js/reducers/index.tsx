import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

const createRootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history)
  });

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
export default createRootReducer;
