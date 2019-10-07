import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { setUsers, addUser } from "./usersSlice";

export const Users = props => {
  const dispatch = useDispatch();
  const setUsersC = useCallback(() => {
    dispatch(setUsers(["u1", "u2", "u3"]));
  }, [dispatch]);

  const addUserC = useCallback(() => {
    dispatch(addUser("u99"));
  }, [dispatch]);

  const testGetUsers = useCallback(async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const { data } = res;
    console.log({ data });
  }, []);

  const users = useSelector(state => state.users);
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
        <button onClick={testGetUsers} className="btn btn-primary">
          testGetUsers
        </button>
      </div>
      <div className="mt-4">
        Users:
        <pre>{JSON.stringify(users)}</pre>
      </div>
    </div>
  );
};

export default Users;
