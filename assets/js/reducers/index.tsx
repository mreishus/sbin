import { combineReducers } from "redux";
import todosReducer from "../features/todos/todosSlice";
import visibilityFilterReducer from "../features/filters/filtersSlice";
import users from "../features/users/usersSlice";

const rootReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
  users
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
