import React from "react";
import Input from "./common/input";

interface IProps {
  label?: string;
  value?: string;
  onChange?: any;
}
const PasswordInput: React.FC<IProps> = ({ label, value, onChange }) => {
  return (
    <div className=" relative w-full ">
      <Input
        label={label}
        value={value}
        placeholder="Password"
        type={"password"}
        onChange={onChange}
        hint={"Your password is securely encrypted."}
      />
    </div>
  );
};

export default PasswordInput;
