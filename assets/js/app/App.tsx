import React from "react";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Link } from "react-router-dom";
import TestPage from "../pages/TestPage";
import { history } from "../store";

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
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
          <Link to="/users" className={linkClass}>
            Users
          </Link>{" "}
          <Link to="/test_page" className={linkClass}>
            Test Page
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
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </ConnectedRouter>
  );
}
