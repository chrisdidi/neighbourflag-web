import React from "react";

interface IProps {
  appearance?: "primary" | "minimal";
  disabled?: boolean;
  intent?: "success" | "danger" | "default" | "cancel";
  label?: string;
  loading?: boolean;
  loadingLabel?: string;
  onClick?: any;
}

const Button: React.FC<IProps> = ({
  appearance,
  disabled,
  intent,
  loading,
  loadingLabel,
  label,
  onClick,
}) => {
  const getColors = () => {
    switch (intent) {
      case "success":
        return appearance === "minimal"
          ? " text-green-400 "
          : " bg-green-400 text-white ";
      case "danger":
        return appearance === "minimal"
          ? " text-red-400 "
          : " bg-red-400 text-white";
      case "cancel":
        return appearance === "minimal" ? "text-gray-400" : "bg-gray-200";
      default:
        return appearance === "minimal"
          ? "text-primary"
          : "bg-primary text-white";
    }
  };
  return (
    <button
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      className={` ${getColors()} ${
        disabled
          ? " cursor-not-allowed opacity-80"
          : " cursor-pointer hover:bg-opacity-80  hover:shadow-lg"
      } rounded-lg animation-all py-3 px-4 w-full shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none`}
    >
      {loading ? loadingLabel || "Loading..." : label}
    </button>
  );
};

export default Button;
