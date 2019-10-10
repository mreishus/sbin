import React from "react";
import Note from "../features/notes/Note";
import { RouteComponentProps } from "react-router-dom";

type TParams = { id: string };
interface Props extends RouteComponentProps<TParams> {}

export const NoteShow = ({ match }: Props) => {
  const {
    params: { id }
  } = match;

  return (
    <div>
      <Note id={id} />
    </div>
  );
};
export default NoteShow;
