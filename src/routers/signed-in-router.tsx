import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import Menu from "../components/menu";
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
      <div className=" w-full flex md:flex-row-reverse">
        <Menu />
        {signedInPath.map((path, index) => (
          <Route key={`${path.path}_${index}`} {...path} />
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
