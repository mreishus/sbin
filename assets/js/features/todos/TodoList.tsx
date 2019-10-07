import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

import { TodoState } from "./todosSlice";
type ToggleIt = { id: number };
interface Props {
  todos: TodoState;
  toggleTodo: (arg0: ToggleIt) => void;
}

const TodoList = ({ todos, toggleTodo }: Props) => (
  <ul className="list-disc">
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onClick={() => toggleTodo({ id: todo.id })}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired
};

export default TodoList;
