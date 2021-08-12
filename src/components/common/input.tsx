import React from "react";
import { useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

interface IProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: any;
  type?: string;
  name?: string;
  hint?: string;
}
const Input: React.FC<IProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  name,
  hint,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className=" w-full">
      <div className="relative font-poppins mt-5">
        <input
          id={name}
          name={name}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={onChange}
          className="peer font-poppins text-gray-500 px-1 h-10 w-full border-b-2 border-gray-300 placeholder-transparent placeholder-white placeholder-opacity-0 focus:outline-none focus:border-primary"
          placeholder={placeholder}
        />
        <label
          htmlFor={name}
          className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
        >
          {label}
        </label>
        {type === "password" && (
          <div className=" absolute bottom-0 right-0 h-full flex items-center justify-center">
            <div
              className=" cursor-pointer text-primary"
              onClick={setShowPassword.bind(this, !showPassword)}
            >
              {showPassword ? (
                <RiEyeLine size={22} />
              ) : (
                <RiEyeCloseLine size={22} />
              )}
            </div>
          </div>
        )}
      </div>
      <p className=" italic text-sm text-gray-500 mt-2 text-xs">{hint}</p>
    </div>
  );
};

export default Input;
