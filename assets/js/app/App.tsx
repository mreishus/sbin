import React, { Component } from "react";
//import PropTypes from "prop-types";

import Footer from "../features/filters/Footer";
import AddTodo from "../features/todos/AddTodo";
import VisibleTodoList from "../features/todos/VisibleTodoList";
import Users from "../features/users/Users";

class ReactApp extends Component {
  render() {
    return (
      <div>
        This is a react app
        <div className="alert alert-info mb-4">Testing</div>
        <div className="p-4 bg-teal-100">
          Users
          <Users />
        </div>
        <div className="p-4 bg-red-100">
          <div className="text-xl mb-4">Todo example, react starter kit</div>
          <AddTodo />
          {/* 
          // @ts-ignore Something about react-redux connect(). */}
          <VisibleTodoList />
          <Footer />
        </div>
      </div>
    );
  }
}
export default ReactApp;
