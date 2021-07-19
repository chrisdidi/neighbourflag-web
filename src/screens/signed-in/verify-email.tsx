import { gql, useMutation } from "@apollo/client";
import { Alert, toaster } from "evergreen-ui";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import Button from "../../components/common/button";
import Input from "../../components/common/input";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import useInput from "../../hooks/useInput";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useAuth } from "../../providers/authProvider";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($code: String!) {
    verifyEmail(input: { code: $code }) {
      ok
      error
      message
    }
  }
`;

const RESEND_VERIFICATION_MUTATION = gql`
  mutation {
    requestVerification {
      ok
      error
      message
    }
  }
`;
const SignIn = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [verifyEmail, { loading }] = useMutation(VERIFY_EMAIL_MUTATION);
  const [error, setError] = useState<{
    title: string;
    message: string;
  }>();

  const [resendVerification] = useMutation(RESEND_VERIFICATION_MUTATION, {
    onCompleted: (data) => {
      if (data.requestVerification?.ok) {
        setError(undefined);
        return toaster.success(
          "We've sent you a new code! Please check your mailbox."
        );
      }
      if (data.requestVerification.error)
        return setError({
          title: "Failed to resend code.",
          message: data.requestVerification.error,
        });
    },
  });

  const code = useInput({});
  useScrollToTop();

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const verifyEmailOutcome = await verifyEmail({
        variables: {
          code: code.value,
        },
      });
      const verificationData = verifyEmailOutcome.data?.verifyEmail;
      if (verificationData) {
        if (verificationData.ok)
          return toaster.success("Your e-mail has been verified!");
        if (verificationData.error)
          setError({
            title: "Failed to verify e-mail!",
            message: verificationData.error,
          });
      }
    } catch (error) {
      setError({
        title: "Failed to verify email.",
        message:
          "Ops! We might be facing technical difficulties. Please refresh and try again.",
      });
    }
  };

  const onResend = async () => {
    try {
      resendVerification();
    } catch (error) {
      toaster.danger(
        "Failed to resend verification code! Please try again later."
      );
    }
  };
  return (
    <div className=" absolute top-0 left-0 max-w-screen min-h-screen h-full font-poppins responsive-padding">
      <div className=" pt-40 w-full">
        <form className=" md:max-w-lg" onSubmit={onSignIn}>
          <div className=" w-full animate-slide-right-03">
            <p className=" text-secondary font-semibold text-2xl ">
              Verify E-mail
            </p>
            <p className=" text-gray-400 mt-3">
              We have sent a 6-digit code to your email{" "}
              <span className=" text-primary">{user?.email}</span>. We require
              you to verify your e-mail to prevent frauds.
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
            <div className=" pt-4">
              <Input
                name="code"
                placeholder="6-digit Code"
                label="6-digit Code"
                {...code}
              />
              <p
                onClick={onResend}
                className=" w-max text-primary font-poppins mt-2 font-semibold cursor-pointer"
              >
                Resend code
              </p>
            </div>
          </div>
          <div className=" w-full mt-20 animate-slide-right-09 pb-24">
            <Button
              appearance="primary"
              loading={loading}
              disabled={loading}
              label="Verify E-mail"
              onClick={onSignIn}
            />
            <p className=" mt-3 text-center text-gray-500">
              <span
                onClick={() => {
                  localStorage.removeItem(LOCALSTORAGE_TOKEN);
                  authTokenVar(undefined);
                  isLoggedInVar(false);
                  history.push("/");
                }}
                className=" text-primary cursor-pointer hover:font-semibold"
              >
                &larr; Back to Home
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
