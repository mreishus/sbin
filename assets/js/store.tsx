import { configureStore } from "redux-starter-kit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer
});

/* Hot reload support - This doesn't work because phoenix
is serving the JS files in development, not webpack. */
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
