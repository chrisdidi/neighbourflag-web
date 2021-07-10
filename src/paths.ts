import Home from "./screens/common/home";
import CreateAccount from "./screens/signed-out/create-account";
import SignIn from "./screens/signed-out/sign-in";

export const mainPath = [
  {
    component: Home,
    path: "/",
    exact: true,
  },
];

export const signedOutPath = [
  {
    component: SignIn,
    path: "/sign-in",
    exact: true,
  },
  {
    component: CreateAccount,
    path: "/create-account",
    exact: true,
  },
];
