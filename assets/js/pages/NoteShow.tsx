import React from "react";
import Note from "../features/notes/Note";
import { RouteComponentProps } from "react-router-dom";

type TParams = { id: string; password: string };
interface Props extends RouteComponentProps<TParams> {}

export const NoteShow = ({ match }: Props) => {
  const {
    params: { id, password }
  } = match;

  return (
    <div>
      <Note id={id} password={password} />
    </div>
  );
};
export default NoteShow;
