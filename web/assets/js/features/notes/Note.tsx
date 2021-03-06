import React, { useState, useEffect, useCallback } from "react";
import useClipboard from "react-use-clipboard";
import useDataApi from "../../hooks/useDataApi";

import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import { keyFromPasswordSalt, decrypt } from "../../crypto";
import { format, parseISO, formatDistanceToNow } from "date-fns";

interface Props {
  id: string;
  password: string;
  isNew: boolean;
}

const getCurrentUrlNoQuery = () => window.location.href.split("?")[0];
const getCurrentNoteUrl = (password: string) =>
  getCurrentUrlNoQuery() + "#" + password;

export const Note = ({ id, password, isNew }: Props) => {
  const [isCopied, setCopied] = useClipboard(getCurrentNoteUrl(password), {
    successDuration: 10000,
  });
  const [decryptedContent, setDecryptedContent] = useState("Decrypting..");
  const [decryptedTitle, setDecryptedTitle] = useState("");
  const { data, isLoading, isError, doFetch } = useDataApi(
    `/api/notes/${id}`,
    null
  );

  useEffect(() => {
    doFetch(`/api/notes/${id}`);
  }, [doFetch, id]);

  useEffect(() => {
    async function decode(content: string, title: string, salt: string) {
      const key = await keyFromPasswordSalt(password, salt);
      const dc_c = decrypt(content, key);
      setDecryptedContent(dc_c);
      if (title != null && title.length > 0) {
        const dc_t = decrypt(title, key);
        setDecryptedTitle(dc_t);
      }
    }
    if (data == null || data.data == null) {
      return;
    }
    const { data: note } = data;
    const { content, title, salt } = note;
    decode(content, title, salt);
  }, [data, password]);

  // Autofocus effect
  const urlRef = useCallback((node) => {
    if (node != null) {
      node.focus();
      node.select();
    }
  }, []);

  if (isError) {
    return <div>Error.</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else if (data == null || data.data == null) {
    return <div>Data is null</div>;
  }

  const note = data.data;
  const expireDate = parseISO(note.expire);

  const tooLong = decryptedContent.length > 200000;

  return (
    <div className="container mx-auto m-4 px-2">
      {isNew && (
        <div className="border border-green-600 rounded w-3/4 lg:w-1/2 p-2 mx-auto bg-green-800 shadow-lg">
          <span role="img" aria-label="Checkmark">
            ✅
          </span>{" "}
          Your paste has been posted.
          <input
            ref={urlRef}
            readOnly
            className="bg-green-900 text-green-100 rounded w-full p-1 block"
            type="text"
            value={getCurrentNoteUrl(password)}
          />
          <button
            onClick={setCopied}
            className="border border-green-400 p-2 bg-green-600 shadow rounded mt-2"
          >
            {isCopied ? "Copied!" : "Copy URL to clipboard"}
          </button>
        </div>
      )}
      <h1 className="text-3xl text-green-200 mt-4">View Paste</h1>
      {decryptedTitle}
      {tooLong && (
        <pre className="whitespace-pre-wrap rounded-lg mt-2 text-base bg-black text-gray-100 p-4">
          {decryptedContent}
        </pre>
      )}
      {!tooLong && (
        <SyntaxHighlighter
          language={note.syntax || "text"}
          style={tomorrow}
          wrapLines={true}
          className={"whitespace-pre-wrap rounded-lg mt-2 text-base"}
          customStyle={{
            whiteSpace: "pre-wrap",
            background: "rgb(0, 0, 0) none repeat scroll 0% 0%",
          }}
        >
          {decryptedContent}
        </SyntaxHighlighter>
      )}
      <span className="italic text-green-400">
        expires {formatDistanceToNow(expireDate, { addSuffix: true })}{" "}
        <span className="text-gray-500">
          {format(expireDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}
        </span>
      </span>
    </div>
  );
};
export default Note;
