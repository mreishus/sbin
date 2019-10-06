import React, { Component } from "react";
//import PropTypes from "prop-types";

import Footer from "../features/filters/Footer";
import AddTodo from "../features/todos/AddTodo";
import VisibleTodoList from "../features/todos/VisibleTodoList";

class ReactApp extends Component {
  render() {
    return (
      <div>
        This is a react app
        <div className="alert alert-info mb-4">Testing</div>
        <div className="p-4 bg-red-100">
          <div className="text-xl mb-4">Todo example, react starter kit</div>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </div>
    );
  }
}
export default ReactApp;
