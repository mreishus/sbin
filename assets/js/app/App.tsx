import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Link } from "react-router-dom";
import TestPage from "../pages/TestPage";
import { history } from "../store";

import NotePage from "../pages/NotePage";

function Home() {
  return <h2>Home??</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default function App() {
  const linkClass = "underline text-blue-600";
  return (
    <ConnectedRouter history={history}>
      <div>
        <nav>
          <Link to="/" className={linkClass}>
            Home
          </Link>{" "}
          <Link to="/about" className={linkClass}>
            About
          </Link>{" "}
          <Link to="/test_page" className={linkClass}>
            Test Page
          </Link>
          <Link
            to="/note/2223ad00-5ab2-4e57-815d-11ce06b9d17f"
            className={linkClass}
          >
            Show Note
          </Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/test_page">
            <TestPage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/note/:id" component={NotePage} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </ConnectedRouter>
  );
}
