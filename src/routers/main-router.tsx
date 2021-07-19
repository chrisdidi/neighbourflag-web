import React from "react";
import { useReactiveVar } from "@apollo/client";
import { Route, Switch } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { mainPath, signedOutPath } from "../paths";
import SignedInRouter from "./signed-in-router";
import NotFound from "../screens/public/not-found";
import { useAuth } from "../providers/authProvider";
import LoadingScreen from "../screens/public/LoadingScreen";

const MainRouter = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { userLoading } = useAuth();
  return (
    <Switch>
      {mainPath.map((path, index) => (
        <Route key={`${path.path}_${index}`} {...path} />
      ))}
      {isLoggedIn ? (
        <SignedInRouter />
      ) : (
        signedOutPath.map((path, index) => (
          <Route key={`${path.path}_${index}`} {...path} />
        ))
      )}
      <Route>{userLoading ? <LoadingScreen /> : <NotFound />}</Route>
    </Switch>
  );
};

export default MainRouter;
