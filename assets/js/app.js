// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"; // eslint-disable-line

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import React from "react";
import { render } from "react-dom";
import App from "./components/App";

import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer
});

let $$ = f => document.getElementById(f);
if ($$("react-app-root")) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    $$("react-app-root")
  );
}
