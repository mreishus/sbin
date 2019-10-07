// https://iamturns.com/typescript-babel/
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, addUser, fetchUsers } from "./usersSlice";

export const Users = props => {
  const dispatch = useDispatch();
  const setUsersC = useCallback(() => {
    dispatch(setUsers(["u1", "u2", "u3"]));
  }, [dispatch]);

  const addUserC = useCallback(() => {
    dispatch(addUser("u99"));
  }, [dispatch]);

  const fetchUsersC = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const isLoading = useSelector(state => state.users.isLoading);
  const users = useSelector(state => state.users.users);

  return (
    <div>
      Users
      <div className="mt-4">
        <button onClick={setUsersC} className="btn btn-primary">
          Set Users to "u1", "u2", "u3"
        </button>
      </div>
      <div className="mt-4">
        <button onClick={addUserC} className="btn btn-primary">
          Add "u99" user
        </button>
      </div>
      <div className="mt-4">
        <button onClick={fetchUsersC} className="btn btn-primary">
          Fetch Users from API
        </button>
      </div>
      <div className="mt-4">
        Loading:
        {isLoading ? "True" : "False"}
        <br />
        Users:
        <pre>{JSON.stringify(users)}</pre>
      </div>
    </div>
  );
};

export default Users;
