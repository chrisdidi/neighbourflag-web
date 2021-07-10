import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/common/button";
import Input from "../../components/common/input";
import PasswordInput from "../../components/password-input";
import useScrollToTop from "../../hooks/useScrollToTop";

const CreateAccount = () => {
  const history = useHistory();
  useScrollToTop();
  return (
    <div className=" absolute top-0 left-0 max-w-screen min-h-screen font-poppins responsive-padding pb-20">
      <div className=" pt-40 w-full">
        <form className=" md:max-w-lg">
          <div className=" w-full animate-slide-right-03">
            <p className=" text-secondary font-semibold text-2xl ">
              Create an account.
            </p>
            <p className=" text-gray-400 mt-3">
              With an account, you can:
              <br />
              - Raise flags and respond to people who wish to offer help <br />
              - Keep a record those who have helped you
              <br />
              - Keep a record of the people you've helped
              <br />
            </p>
          </div>
          <div className=" mt-10 animate-slide-right-06">
            <Input name="name" placeholder="Your Name" label="Your Name" />
            <div className=" mt-10 relative">
              <Input
                name="email"
                placeholder="Email address"
                label="Email address"
                hint="If you raise a flag and someone wishes to offer help, we will notify you via your e-mail. We will never use your e-mail for anything other than this."
              />
            </div>
            <div className=" mt-10 relative">
              <Input
                name="phone"
                placeholder="Contact no."
                label="Contact no. (Optional)"
                hint="If you raise a flag, upon acceptance of help, your contact number will be shared with volunteers so they can reach out to you."
              />
            </div>
            <div className=" mt-10 relative">
              <PasswordInput label="Password" />
            </div>
          </div>
          <div className=" w-full mt-20 animate-slide-right-09">
            <Button appearance="primary" label="Create Account" />
            <p className=" mt-3 text-center text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => history.push("/sign-in")}
                className=" text-primary cursor-pointer hover:font-semibold"
              >
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
