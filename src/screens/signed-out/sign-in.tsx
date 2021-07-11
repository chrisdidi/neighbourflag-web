import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/common/button";
import Input from "../../components/common/input";
import GoogleSignInButton from "../../components/external/google-signin-button";
import PasswordInput from "../../components/password-input";
import SeeFlagsLink from "../../components/see-flags-link";
import useScrollToTop from "../../hooks/useScrollToTop";

const SignIn = () => {
  const history = useHistory();

  useScrollToTop();
  return (
    <div className=" absolute top-0 left-0 max-w-screen min-h-screen h-full font-poppins responsive-padding">
      <div className=" pt-40 w-full">
        <form className=" md:max-w-lg">
          <div className=" w-full animate-slide-right-03">
            <div className=" my-4">
              <SeeFlagsLink />
            </div>
            <p className=" text-secondary font-semibold text-2xl ">
              Sign In to raise flags.
            </p>
            <p className=" text-gray-400 mt-3">
              We try to keep the process as simple as possible! Having an
              account allows you to view the flags you raised and respond to
              those who wants to help!
            </p>
          </div>
          <div className=" mt-10 animate-slide-right-06">
            <Input
              name="email"
              placeholder="Email address"
              label="Email address"
            />
            <div className=" mt-10 relative">
              <PasswordInput label="Password" />
            </div>
          </div>
          <div className=" w-full mt-20 animate-slide-right-09 pb-24">
            <Button appearance="primary" label="Sign In" />
            <p className=" mt-3 text-center text-gray-500">
              First time here?{" "}
              <span
                onClick={() => history.push("/create-account")}
                className=" text-primary cursor-pointer hover:font-semibold"
              >
                Create Account
              </span>
            </p>
            <div className=" my-4 flex justify-around space-x-3 items-center">
              <div className=" border border-solid border-t border-gray-200 w-full" />
              <p className=" text-gray-400 font-poppins">or</p>
              <div className=" border border-solid border-t border-gray-200 w-full" />
            </div>
            <GoogleSignInButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
