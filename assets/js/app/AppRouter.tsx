import React from "react";
import { Switch, Route } from "react-router-dom";

import NoteIndex from "../pages/NoteIndex";
import NoteShow from "../pages/NoteShow";
import TestPage from "../pages/TestPage";

interface Props {}

export const AppRouter = (props: Props) => {
  return (
    <Switch>
      <Route path="/test_page">
        <TestPage />
      </Route>
      <Route path="/note/:id/:password" component={NoteShow} />
      <Route path="/note" component={NoteIndex} />
      <Route path="/" component={NoteIndex} />
    </Switch>
  );
};
export default AppRouter;
