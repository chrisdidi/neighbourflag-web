import { gql, useMutation } from "@apollo/client";
import { Alert } from "evergreen-ui";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/common/button";
import Input from "../../components/common/input";
import PasswordInput from "../../components/password-input";
import SeeFlagsLink from "../../components/see-flags-link";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import useInput from "../../hooks/useInput";
import useScrollToTop from "../../hooks/useScrollToTop";

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      ok
      message
      error
      accessToken
      id
    }
  }
`;
const SignIn = () => {
  const history = useHistory();
  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION);
  const [error, setError] = useState<{
    title: string;
    message: string;
  }>();

  const email = useInput({});
  const password = useInput({});
  useScrollToTop();

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const signInOutcome = await signIn({
        variables: {
          email: email.value,
          password: password.value,
        },
      });
      if (signInOutcome.data?.signIn?.accessToken) {
        localStorage.setItem(
          LOCALSTORAGE_TOKEN,
          signInOutcome.data.signIn?.accessToken
        );
        window.location.reload();
      } else {
        setError({
          title: "Ops! Failed to sign you in!",
          message: signInOutcome.data.signIn?.error,
        });
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className=" absolute top-0 left-0 max-w-screen min-h-screen h-full font-poppins responsive-padding">
      <div className=" pt-40 w-full">
        <form className=" md:max-w-lg" onSubmit={onSignIn}>
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
            {error ? (
              <Alert
                intent={"danger"}
                title={error.title ?? "Failed to sign you in"}
              >
                {error.message}
              </Alert>
            ) : (
              ""
            )}
            <Input
              name="email"
              placeholder="Email address"
              label="Email address"
              {...email}
            />
            <div className=" mt-10 relative">
              <PasswordInput label="Password" {...password} />
            </div>
          </div>
          <div className=" w-full mt-20 animate-slide-right-09 pb-24">
            <Button
              appearance="primary"
              loading={loading}
              disabled={loading}
              label="Sign In"
              onClick={onSignIn}
            />
            <p className=" mt-3 text-center text-gray-500">
              First time here?{" "}
              <span
                onClick={() => history.push("/create-account")}
                className=" text-primary cursor-pointer hover:font-semibold"
              >
                Create Account
              </span>
            </p>
            {/* <div className=" my-4 flex justify-around space-x-3 items-center">
              <div className=" border border-solid border-t border-gray-200 w-full" />
              <p className=" text-gray-400 font-poppins">or</p>
              <div className=" border border-solid border-t border-gray-200 w-full" />
            </div>
            <GoogleSignInButton /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
