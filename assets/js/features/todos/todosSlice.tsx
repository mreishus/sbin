import { createSlice } from "redux-starter-kit";

let nextTodoId = 0;

export type TodoState = Array<TodoI>;
export interface TodoI {
  id: number;
  text: string;
  completed: boolean;
}

const todosSlice = createSlice({
  slice: "todos",
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state: TodoState, action) {
        const { id, text } = action.payload;
        const todo: TodoI = { id, text, completed: false };
        state.push(todo);
      },
      prepare(text) {
        return { payload: { text, id: nextTodoId++ } };
      }
    },
    toggleTodo(state: TodoState, action) {
      const todo = state.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { addTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
