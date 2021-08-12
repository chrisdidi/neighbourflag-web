import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import Menu from "../components/menu";
import { signedInPath } from "../paths";
import { useAuth } from "../providers/authProvider";
import { MenuProvider } from "../providers/menuProvider";
import LoadingScreen from "../screens/public/LoadingScreen";
import VerifyEmail from "../screens/signed-in/verify-email";

const SignedInRouter = () => {
  const { user, userLoading } = useAuth();
  return !userLoading ? (
    user?.emailVerified ? (
      <MenuProvider>
        <div className=" w-full flex md:flex-row-reverse">
          <Menu />
          {signedInPath.map((path, index) => (
            <Route key={`${path.path}_${index}`} {...path} />
          ))}
          <Route>
            <Redirect to="/map" />
          </Route>
        </div>
      </MenuProvider>
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
