import React from "react";
import Note from "../features/notes/Note";
import { RouteComponentProps, useLocation } from "react-router-dom";

type TParams = { id: string; password: string };
interface Props extends RouteComponentProps<TParams> {}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const NoteShow = ({ match }: Props) => {
  const {
    params: { id, password }
  } = match;

  const q = useQuery();
  const isNew = q.get("new") == 1;

  return (
    <div>
      <Note id={id} password={password} isNew={isNew} />
    </div>
  );
};
export default NoteShow;
