import React, { useState } from "react";

interface IProps {
  defaultValue?: string;
  disabled?: boolean;
}
const useInput = ({ defaultValue, disabled = false }: IProps) => {
  const [value, setValue] = useState(defaultValue || "");

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (!disabled) {
      if (typeof e === "string") return setValue(value);
      if (e?.target) {
        return setValue(e.target.value);
      }
    }
  };
  return {
    value,
    onChange,
  };
};

export default useInput;
