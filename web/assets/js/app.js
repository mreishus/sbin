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

/////////////////////////
/////////////////// REACT
/////////////////////////

import React from "react";
import { render } from "react-dom";
import App from "./app/App";

import { Provider } from "react-redux";
import store from "./store";

// We could add HMR support here, but it doesn't seem worth
// it unless we change phoenix to load JS files off a different
// port in development, so that webpack would be the dev server.
let $$ = (f) => document.getElementById(f);
if ($$("react-app-root")) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    $$("react-app-root")
  );
}
