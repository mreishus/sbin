import { createSlice } from "redux-starter-kit";

const usersSlice = createSlice({
  slice: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    addUser(state, action) {
      state.push(action.payload);
      return state;
    }
  }
});

export const { setUsers, addUser } = usersSlice.actions;

export default usersSlice.reducer;
