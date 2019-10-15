import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import { push } from "connected-react-router";
import Select from "react-select";
import { useDispatch } from "react-redux";

import { keyFromPassword, encrypt, makeRandomString } from "../../crypto";
import selectTheme from "./selectTheme";
import syntaxOptions from "./syntaxOptions";
import useForm from "../../hooks/useForm";

const expireOptions = [
  { value: "15 minutes", label: "15 minutes" },
  { value: "1 hour", label: "1 hour" },
  { value: "1 day", label: "1 day" },
  { value: "1 week", label: "1 week" },
  { value: "1 month", label: "1 month" },
  { value: "3 months", label: "3 months" },
  { value: "1 year", label: "1 year" },
  { value: "3 years", label: "3 years" }
];

interface Props {}

// Can't use slashes in password due to react-router
const makePassword = () => makeRandomString(9).replace("/", "s");

export const NewNote = (props: Props) => {
  // State: loading and error flags, error message, syntax dropdown
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [syntaxValue, setSyntaxValue] = useState({
    value: "text",
    label: "text"
  });
  const [expireValue, setExpireValue] = useState(expireOptions[3]);

  // Autofocus effect
  const textAreaRef = useRef(null);
  useEffect(() => {
    if (textAreaRef != null && textAreaRef.current != null) {
      // @ts-ignore: Object is possibly 'null'.
      textAreaRef.current.focus();
    }
  }, []);

  // Use redux to redirect user after saving
  const dispatch = useDispatch();
  const goToNote = useCallback(
    (noteShortcode, password) => {
      dispatch(push(`/note/${noteShortcode}?new=1#${password}`));
    },
    [dispatch]
  );

  // Form state, form handler, and onsubmit function
  const { inputs, handleSubmit, handleInputChange } = useForm(async () => {
    try {
      // Build Encrypted Data
      const password = makePassword();
      const { key, salt } = await keyFromPassword(password);
      const encryptedContentB64 = encrypt(inputs.content, key);
      if (inputs.title == null) {
        inputs.title = "";
      }
      const encryptedTitleB64 = encrypt(inputs.title, key);

      const note: Record<string, string> = {
        ...inputs,
        salt: salt,
        content: encryptedContentB64,
        title: encryptedTitleB64
      };

      setIsLoading(true);
      setIsError(false);
      const data = {
        note
      };

      if (syntaxValue != null && syntaxValue.value != null) {
        data.note.syntax = syntaxValue.value;
      }
      if (expireValue != null && expireValue.value != null) {
        data.note.expire = expireValue.value;
      }

      const res = await axios.post("/api/notes", data);
      setIsLoading(false);
      const { shortcode } = res.data.data;
      goToNote(shortcode, password);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(e.message);
    }
  });

  return (
    <div className="container mx-auto m-4 px-2">
      <form action="POST" onSubmit={handleSubmit}>
        <fieldset disabled={isLoading} aria-busy={isLoading}>
          <label htmlFor="content">
            <h1 className="text-3xl text-green-200">new paste</h1>
            <textarea
              ref={textAreaRef}
              className="border block form-control mt-2 w-full mx-auto font-mono text-lg"
              onChange={handleInputChange}
              value={inputs.content}
              id="content"
              name="content"
              rows={12}
            />
          </label>
          <table className="text-green-200 w-full md:w-3/4 lg:w-1/2 mt-4">
            <tbody>
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
                    onChange={(val: any) => setSyntaxValue(val)}
                    isClearable
                    menuPlacement="top"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-1 pr-2">expiration</td>
                <td className="py-1">
                  <Select
                    theme={selectTheme}
                    options={expireOptions}
                    value={expireValue}
                    onChange={(val: any) => setExpireValue(val)}
                  />
                </td>
              </tr>
              <tr>
                <td className="py-1 pr-2">discoverability</td>
                <td className="py-1">
                  <span className="ml-2 font-ibm text-teal-200">
                    Unlisted, but public to anyone with the URL
                  </span>
                </td>
              </tr>
            </tbody>
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
