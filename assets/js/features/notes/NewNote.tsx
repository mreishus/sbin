import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { push } from "connected-react-router";

import useForm from "../../hooks/useForm";

interface Props {}

export const NewNote = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const goToNote = useCallback(
    noteId => {
      console.log("redirect to noteId [" + noteId + "]");
      dispatch(push("/note/" + noteId));
    },
    [dispatch]
  );

  const { inputs, handleSubmit, handleInputChange } = useForm(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = { note: inputs };
      const res = await axios.post("/api/notes", data);
      setIsLoading(false);
      const id = res.data.data.id;
      goToNote(id);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(e.message);
    }
  });

  return (
    <div className="container mx-auto m-10">
      New Note
      <form action="POST" onSubmit={handleSubmit}>
        <fieldset disabled={isLoading} aria-busy={isLoading}>
          <label htmlFor="title">
            <input
              className="border block"
              type="text"
              id="title"
              name="title"
              onChange={handleInputChange}
              value={inputs.title || ""}
            />
          </label>

          <label htmlFor="content">
            <textarea
              onChange={handleInputChange}
              value={inputs.content}
              id="content"
              name="content"
              cols={30}
              rows={10}
              className="border block"
            />
          </label>

          <button type="submit">Submit</button>
          {isError && (
            <div className="alert alert-danger max-w-lg">{errorMessage}</div>
          )}
        </fieldset>
      </form>
    </div>
  );
};
export default NewNote;
