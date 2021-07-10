import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { mainPath } from "../paths";

const MainRouter = () => {
  return (
    <Switch>
      {mainPath.map((path, index) => (
        <Route key={`${path.path}_${index}`} {...path} />
      ))}
    </Switch>
  );
};

export default MainRouter;
