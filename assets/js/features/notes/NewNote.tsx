import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { push } from "connected-react-router";

import useForm from "../../hooks/useForm";

import Select from "react-select";

import syntaxOptions from "./syntaxOptions";
import selectTheme from "./selectTheme";

interface Props {}

export const NewNote = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [syntaxValue, setSyntaxValue] = useState({
    value: "text",
    label: "text"
  });

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
      // @ts-ignore: Object is possibly 'null'.
      if (syntaxValue != null && syntaxValue.value != null) {
        // @ts-ignore: Object is possibly 'null'.
        data.note.syntax = syntaxValue.value;
      }
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

  const handleSelectInputChange = (val: any) => {
    setSyntaxValue(val);
  };

  return (
    <div className="container mx-auto m-10">
      <form action="POST" onSubmit={handleSubmit}>
        <fieldset disabled={isLoading} aria-busy={isLoading}>
          <label htmlFor="content">
            <h1 className="text-3xl text-green-200">new paste</h1>
            <textarea
              className="border block form-control mt-2 w-full mx-auto font-mono text-lg"
              onChange={handleInputChange}
              value={inputs.content}
              id="content"
              name="content"
              rows={12}
            />
          </label>
          <table className="text-green-200 w-1/2 mt-4">
            <tr>
              <td className="py-1 pr-2">optional title</td>
              <td className="py-1 ">
                <input
                  className="border block form-control mt-2 w-full font-mono"
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleInputChange}
                  value={inputs.title || ""}
                />
              </td>
            </tr>
            <tr>
              <td className="py-1 pr-2">syntax highlighting</td>
              <td className="py-1">
                <Select
                  theme={selectTheme}
                  options={syntaxOptions}
                  value={syntaxValue}
                  onChange={handleSelectInputChange}
                  isClearable
                  menuPlacement="top"
                />
              </td>
            </tr>
            <tr>
              <td className="py-1 pr-2">expiration</td>
              <td className="py-1">
                <span className="ml-2 font-ibm text-teal-200">One month</span>
              </td>
            </tr>
            <tr>
              <td className="py-1 pr-2">discoverability</td>
              <td className="py-1">
                <span className="ml-2 font-ibm text-teal-200">
                  Unlisted, but public
                </span>
              </td>
            </tr>
          </table>

          <button
            type="submit"
            className="border border-green-400 rounded px-4 py-2 mt-4 bg-green-600 font-semibold"
          >
            create new paste
          </button>
          {isError && (
            <div className="alert alert-danger max-w-lg mt-4">
              {errorMessage}
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
};
export default NewNote;
