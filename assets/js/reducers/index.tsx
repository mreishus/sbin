import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import todosReducer from "../features/todos/todosSlice";
import visibilityFilterReducer from "../features/filters/filtersSlice";
import users from "../features/users/usersSlice";

const createRootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    todos: todosReducer,
    visibilityFilter: visibilityFilterReducer,
    users
  });

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
export default createRootReducer;

/*
const rootReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
  users,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
 */
