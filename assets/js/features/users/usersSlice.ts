import { createSlice } from "redux-starter-kit";
import { getUsers } from "../../api/users";

const initialState = {
  users: [],
  isLoading: false,
  error: null
};

const usersSlice = createSlice({
  slice: "users",
  initialState,
  reducers: {
    getUsersStart(state) {
      state.isLoading = true;
    },
    getUsersSuccess(state, { payload }) {
      state.users = payload;
      state.isLoading = false;
      state.error = null;
    },
    getUsersFailure(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    setUsers(state, action) {
      return {
        ...state,
        users: action.payload
      };
    },
    addUser(state, action) {
      state.users.push(action.payload);
    }
  }
});

export const {
  setUsers,
  addUser,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure
} = usersSlice.actions;

export default usersSlice.reducer;

//////////////
/// THUNKS ///
//////////////

export const fetchUsers = () => async dispatch => {
  try {
    dispatch(getUsersStart());
    const users = await getUsers();
    dispatch(getUsersSuccess(users));
  } catch (err) {
    dispatch(getUsersFailure(err.toString()));
  }
};
