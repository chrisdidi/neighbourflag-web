import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import LoadingScreen from "../screens/public/LoadingScreen";
import ListOnMap from "../screens/signed-in/list-on-map";
import VerifyEmail from "../screens/signed-in/verify-email";

const signedInPath = [
  {
    path: "/map",
    component: ListOnMap,
    exact: true,
  },
];
const SignedInRouter = () => {
  const { user, userLoading } = useAuth();
  return !userLoading ? (
    user?.emailVerified ? (
      <div>
        {signedInPath.map((path) => (
          <Route {...path} />
        ))}
        <Route>
          <Redirect to="/map" />
        </Route>
      </div>
    ) : (
      <div>
        <Route path="/verify-email" component={VerifyEmail} />
        <Route>
          <Redirect to="verify-email" />
        </Route>
      </div>
    )
  ) : (
    <div>
      <Route>
        <LoadingScreen />
      </Route>
    </div>
  );
};
export default SignedInRouter;
