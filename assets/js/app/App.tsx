import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Link } from "react-router-dom";
import { history } from "../store";

import AppRouter from "./AppRouter";

export default function App() {
  return (
    <ConnectedRouter history={history}>
      <div className="">
        <nav className="bg-gray-800 text-teal-200 p-2 font-ibm text-base">
          <Link to="/">
            sbin <span className="text-teal-600">[</span>
            <span className="text-green-400">encrypted </span>
            <span className="text-teal-400">online paste bin</span>
            <span className="text-teal-600">]</span>{" "}
          </Link>
          <Link to="/">
            <span className="text-green-300 bg-green-800 px-2 py-1 rounded-lg ml-4">
              <span className="text-green-100">+n</span>ew{" "}
              <span className="text-green-100">p</span>aste
              <span className="text-green-200">!</span>
            </span>
          </Link>
        </nav>

        <AppRouter />
      </div>
    </ConnectedRouter>
  );
}
