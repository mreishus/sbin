import React from "react";
import PropTypes from "prop-types";

import { TodoI } from "./todosSlice";

interface Props {
  todo: TodoI;
  onClick: any;
}

const Todo = ({ onClick, todo }: Props) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: todo.completed ? "line-through" : "none"
    }}
  >
    {todo.text}
  </li>
);

export default Todo;
