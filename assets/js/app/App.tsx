import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Link } from "react-router-dom";
import { history } from "../store";

import AppRouter from "./AppRouter";

export default function App() {
  const linkClass = "underline text-blue-600";
  return (
    <ConnectedRouter history={history}>
      <div className="appy">
        <nav>
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
        </nav>

        <AppRouter />
      </div>
    </ConnectedRouter>
  );
}
