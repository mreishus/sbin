import React, { useState, useEffect } from "react";
import axios from "axios";

import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

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

//const result = await axios("/api/notes/" + id);

export const Note = ({ id }: Props) => {
  const { data, isLoading, isError, doFetch } = useDataApi(
    `/api/notes/${id}`,
    null
  );
  useEffect(() => {
    doFetch(`/api/notes/${id}`);
  }, [doFetch, id]);

  if (isError) {
    return <div>Error.</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else if (data == null || data.data == null) {
    return <div>Data is null</div>;
  }
  const note = data.data;
  return (
    <div className="container mx-auto m-10">
      <h1 className="text-3xl text-green-200">View Paste</h1>
      <SyntaxHighlighter
        language="javascript"
        style={tomorrow}
        wrapLines={true}
        className={"whitespace-pre-wrap rounded-lg mt-2"}
        customStyle={{ whiteSpace: "pre-wrap" }}
      >
        {note.content}
      </SyntaxHighlighter>
    </div>
  );
};
export default Note;
