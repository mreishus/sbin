import React, { useState, useEffect, useContext } from "react";
import classnames from "classnames";
import axios from "axios";

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
  }
  return (
    <div>
      Note Here: Id {id}
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
};
export default Note;
