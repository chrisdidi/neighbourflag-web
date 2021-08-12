import Home from "./screens/public/home";
import CreateAccount from "./screens/signed-out/create-account";
import ListOnMap from "./screens/public/lists";
import SignIn from "./screens/signed-out/sign-in";

export const mainPath = [
  {
    component: Home,
    exact: true,
    path: "/",
  },
];

export const signedOutPath = [
  {
    component: CreateAccount,
    exact: true,
    path: "/create-account",
  },
  {
    component: ListOnMap,
    exact: true,
    path: "/map",
  },
  {
    component: SignIn,
    exact: true,
    path: "/sign-in",
  },
];

export const signedInPath = [
  {
    component: ListOnMap,
    exact: true,
    path: "/map",
  },
];
