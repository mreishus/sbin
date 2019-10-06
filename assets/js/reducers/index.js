import { combineReducers } from "redux";
import todosReducer from "../features/todos/todosSlice";
import visibilityFilterReducer from "../features/filters/filtersSlice";
import users from "../features/users/usersSlice";

export default combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
  users
});
