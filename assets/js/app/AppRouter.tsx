import React from "react";
import { Switch, Route } from "react-router-dom";

import AboutIndex from "../pages/AboutIndex";
import NoteIndex from "../pages/NoteIndex";
import NoteShow from "../pages/NoteShow";

interface Props {}

export const AppRouter = (props: Props) => {
  return (
    <Switch>
      <Route path="/about" component={AboutIndex} />
      <Route path="/note/:id/:password" component={NoteShow} />
      <Route path="/note" component={NoteIndex} />
      <Route path="/" component={NoteIndex} />
    </Switch>
  );
};
export default AppRouter;
