import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Link } from "react-router-dom";
import { history } from "../store";

import AppRouter from "./AppRouter";

export default function App() {
  const linkClass = "underline text-blue-600";
  return (
    <ConnectedRouter history={history}>
      <div className="">
        <nav className="bg-gray-800 text-teal-200 p-2 font-ibm text-base">
          <Link to="/">sbin</Link> <span className="text-teal-600">[</span>
          <span className="text-teal-400">online paste bin</span>
          <span className="text-teal-600">]</span>{" "}
          <Link to="/">
            <span className="text-green-300 bg-green-800 px-2 py-1 rounded-lg ml-4">
              <span className="text-green-100">n</span>ew{" "}
              <span className="text-green-100">p</span>aste
            </span>
          </Link>
          {/*
          <Link to="/" className={linkClass}>
            Home
          </Link>{" "}
          <Link to="/test_page" className={linkClass}>
            Test Page
          </Link>{" "}
          <Link to="/note" className={linkClass}>
            Note Index
          </Link>{" "}
          <Link
            to="/note/2223ad00-5ab2-4e57-815d-11ce06b9d17f"
            className={linkClass}
          >
            Show Note
          </Link>
            */}
        </nav>

        <AppRouter />
      </div>
    </ConnectedRouter>
  );
}
