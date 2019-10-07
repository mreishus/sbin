import React, { useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { addTodo } from "./todosSlice";

type InputEvent = ChangeEvent<HTMLInputElement>;
type ChangeHandler = (e: InputEvent) => void;

interface Props {
  addTodo: (text: string) => void;
}

const mapDispatch = { addTodo };

const AddTodo = ({ addTodo }: Props) => {
  const [todoText, setTodoText] = useState("");

  const onChange: ChangeHandler = e => setTodoText(e.target.value);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!todoText.trim()) {
            return;
          }
          addTodo(todoText);
          setTodoText("");
        }}
      >
        <input value={todoText} onChange={onChange} className="form-control" />
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default connect(
  null,
  mapDispatch
)(AddTodo);
