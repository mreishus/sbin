import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import {
  configureStore,
  Action,
  getDefaultMiddleware
} from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";
import createRootReducer, { RootState } from "./reducers";

export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const store = configureStore({
  reducer: rootReducer,
  middleware
});

/* Hot reload support - This doesn't work because phoenix
is serving the JS files in development, not webpack. */
/*
Typescript doesn't understand this, comment out for now
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}
 */

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
