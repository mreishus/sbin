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
      <form action="POST" onSubmit={handleSubmit}>
        <fieldset disabled={isLoading} aria-busy={isLoading}>
          <label htmlFor="content">
            <h1 className="text-3xl text-green-200">New Paste</h1>
            <textarea
              className="border block form-control mt-2 w-full mx-auto font-mono text-lg"
              onChange={handleInputChange}
              value={inputs.content}
              id="content"
              name="content"
              rows={12}
            />
          </label>
          <label htmlFor="title">
            <h2 className="mt-4 text-green-200">Optional Title</h2>
            <input
              className="border block form-control mt-2 w-1/2 font-mono"
              type="text"
              id="title"
              name="title"
              onChange={handleInputChange}
              value={inputs.title || ""}
            />
          </label>

          <div className="text-green-200 mt-4">
            Expiration:{" "}
            <span className="ml-2 font-ibm text-teal-200">One month</span>
          </div>
          <div className="text-green-200 mt-1">
            Discoverability:{" "}
            <span className="ml-2 font-ibm text-teal-200">
              Unlisted, but public
            </span>
          </div>

          <button
            type="submit"
            className="border border-green-400 rounded px-4 py-2 mt-4 bg-green-600 font-semibold"
          >
            Create New Paste
          </button>
          {isError && (
            <div className="alert alert-danger max-w-lg">{errorMessage}</div>
          )}
        </fieldset>
      </form>
    </div>
  );
};
export default NewNote;
