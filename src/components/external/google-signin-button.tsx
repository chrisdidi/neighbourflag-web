import { toaster } from "evergreen-ui";
import { FormEvent } from "react";
import googleLogo from "../../assets/google-logo.png";
const GoogleSignInButton = () => {
  const onContinue = (e: FormEvent) => {
    e.preventDefault();
    toaster.danger("Feature coming soon!");
  };
  return (
    <button
      onClick={onContinue}
      className=" flex bg-white hover:bg-gray-50 animation-all items-center w-full py-3 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400  "
    >
      <div>
        <img src={googleLogo} height={24} width={24} alt="google-logo" />
      </div>
      <div className=" flex flex-1 items-center justify-center ">
        <p className=" text-gray-500 text-center">Continue with Google</p>
      </div>
    </button>
  );
};

export default GoogleSignInButton;
