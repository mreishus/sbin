import React, { Component } from "react";
//import PropTypes from "prop-types";

import Footer from "./features/filters/Footer";
import AddTodo from "./features/todos/AddTodo";
import VisibleTodoList from "./features/todos/VisibleTodoList";

class ReactApp extends Component {
  render() {
    return (
      <div>
        This is a react app
        <div className="alert alert-info">Testing</div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
}
export default ReactApp;
