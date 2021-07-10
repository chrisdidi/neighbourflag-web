import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/common/button";
import Input from "../../components/common/input";
import PasswordInput from "../../components/password-input";

const SignIn = () => {
  const history = useHistory();
  return (
    <div className=" absolute top-0 left-0 w-screen min-h-screen font-poppins responsive-padding">
      <div className=" pt-40 w-full">
        <form className=" md:max-w-lg">
          <div className=" w-full animate-slide-right-03">
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
          <div className=" w-full mt-32 animate-slide-right-09">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
