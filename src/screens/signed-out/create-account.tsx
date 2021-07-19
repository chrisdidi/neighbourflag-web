import { gql, useMutation } from "@apollo/client";
import { Alert } from "evergreen-ui";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/common/button";
import Input from "../../components/common/input";
import PasswordInput from "../../components/password-input";
import SeeFlagsLink from "../../components/see-flags-link";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import useInput from "../../hooks/useInput";
import useScrollToTop from "../../hooks/useScrollToTop";
import { SignUpMutationData } from "../../types/auth.types";

const CREATE_ACCOUT_MUTATION = gql`
  mutation createAccount($name: String!, $email: String!, $password: String!) {
    createAccount(input: { name: $name, email: $email, password: $password }) {
      ok
      error
      message
      user {
        id
        name
        email
        emailVerified
        createdAt
        profile_picture
        contact_no
        role
        active
        authType
      }
      accessToken
    }
  }
`;

const CreateAccount = () => {
  const history = useHistory();
  const [signUp, { loading }] = useMutation<SignUpMutationData>(
    CREATE_ACCOUT_MUTATION
  );
  const email = useInput({});
  const name = useInput({});
  const password = useInput({});
  const [error, setError] = useState<{
    title: string;
    message: string;
  }>();
  useScrollToTop();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.value?.length < 6)
      return setError({
        title: "Invalid Password",
        message: "Your password must be longer than 6 characters.",
      });
    if (!name.value || !email.value || !password.value) return;
    try {
      const res = await signUp({
        variables: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      });
      const createAccountData = res.data?.createAccount;
      if (createAccountData) {
        if (createAccountData.error) {
          return setError({
            title: "Failed to create account.",
            message: createAccountData.error,
          });
        } else if (createAccountData.accessToken && createAccountData.user) {
          localStorage.setItem(
            LOCALSTORAGE_TOKEN,
            createAccountData.accessToken
          );
          window.location.reload();
          return setError(undefined);
        }
      }
    } catch (error) {
      setError({
        title: "Internal Server Error",
        message:
          "Hey I'm sorry! We might be facing some technical difficulties. Please refresh and try again.",
      });
    }
  };

  useEffect(() => {
    if (error) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [error]);
  return (
    <div className=" absolute top-0 left-0 max-w-screen min-h-screen font-poppins responsive-padding pb-20">
      <div className=" pt-40 w-full">
        <form className=" md:max-w-lg" onSubmit={onSubmit}>
          <div className=" w-full animate-slide-right-03">
            <div className=" my-4">
              <SeeFlagsLink />
            </div>
            <p className=" text-secondary font-semibold text-2xl ">
              Create an account.
            </p>
            <p className=" text-gray-400 mt-3">
              With an account, you can:
              <br />
              - Raise flags and respond to people who wish to offer help <br />
              - Keep a record of those who have helped you
              <br />
              - Keep a record of the people you've helped
              <br />
            </p>
          </div>
          <div className=" mt-10 animate-slide-right-06">
            {error ? (
              <Alert
                intent={"danger"}
                title={error.title ?? "Failed to create account"}
              >
                {error.message}
              </Alert>
            ) : (
              ""
            )}
            <div className=" w-full pb-4">
              <Input
                {...name}
                name="name"
                placeholder="Your name"
                label="Your name"
              />
            </div>
            <div className=" w-full pb-4">
              <Input
                {...email}
                name="email"
                placeholder="Email address"
                label="Email address"
                hint="If you raise a flag and someone wishes to offer help, we will notify you via your e-mail. We will never use your e-mail for anything other than this."
              />
            </div>
            <PasswordInput label="Password" {...password} />
          </div>
          <div className=" w-full mt-20 animate-slide-right-09">
            <Button
              appearance="primary"
              label="Create Account"
              onClick={onSubmit}
              loading={loading}
              disabled={
                !name.value || !email.value || !password.value || loading
              }
            />
            <p className=" mt-3 text-center text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => history.push("/sign-in")}
                className=" text-primary cursor-pointer hover:font-semibold"
              >
                Sign In
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

export default CreateAccount;
