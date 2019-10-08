import React, { useState, useEffect, useContext } from "react";
import classnames from "classnames";
import axios from "axios";

interface Props {
  id: string;
}

// http://localhost:4000/api/notes/2223ad00-5ab2-4e57-815d-11ce06b9d17f

export const Note = ({ id }: Props) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios("/api/notes/" + id);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

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
