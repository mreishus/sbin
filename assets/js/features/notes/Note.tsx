import React, { useState, useEffect } from "react";
import axios from "axios";

import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import { keyFromPasswordSalt, decrypt } from "../../crypto";

interface Props {
  id: string;
}

const useDataApi = (initialUrl: string, initialData: any) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return { data, isLoading, isError, doFetch: setUrl };
};

export const Note = ({ id }: Props) => {
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
      const key = await keyFromPasswordSalt("helloHardcodedPass", salt);
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
  }, [data]);

  if (isError) {
    return <div>Error.</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else if (data == null || data.data == null) {
    return <div>Data is null</div>;
  }
  const note = data.data;
  return (
    <div className="container mx-auto m-4 px-2">
      <h1 className="text-3xl text-green-200">View Paste</h1>
      {decryptedTitle}
      <SyntaxHighlighter
        language={note.syntax || "text"}
        style={tomorrow}
        wrapLines={true}
        className={"whitespace-pre-wrap rounded-lg mt-2"}
        customStyle={{ whiteSpace: "pre-wrap" }}
      >
        {decryptedContent}
      </SyntaxHighlighter>
    </div>
  );
};
export default Note;
