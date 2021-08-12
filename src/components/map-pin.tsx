import React from "react";

interface IProps {
  emoji: string;
  lat: number;
  lng: number;
}
const MapPin: React.FC<IProps> = ({ emoji }) => {
  return (
    <div className={`bg-secondary bg-opacity-50 rounded-full p-2 w-max`}>
      <div className={`block bg-secondary rounded-full h-6 w-6`}>
        <div className={" block mx-auto"}>{emoji}</div>
      </div>
    </div>
  );
};

export default MapPin;
