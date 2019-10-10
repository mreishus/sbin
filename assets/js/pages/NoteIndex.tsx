import React, { useState, useEffect, useContext } from "react";
import classnames from "classnames";
import NewNote from "../features/notes/NewNote";
import { RouteComponentProps } from "react-router-dom";

type TParams = { id: string };
interface Props extends RouteComponentProps<TParams> {}

export const NoteIndex = ({ match }: Props) => {
  const {
    params: { id }
  } = match;

  return (
    <div>
      Note Index
      <NewNote />
    </div>
  );
};
export default NoteIndex;
