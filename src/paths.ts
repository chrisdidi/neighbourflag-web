import Home from "./screens/common/home";
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
];
