import React, { useEffect, useState } from "react";
import LocationIcon from "../../assets/location";
import MapWithFlags from "../../components/map-with-flags";
import { DEFAULT_COORDINATES } from "../../constants";
import { CoordinatesProps } from "../../types/map.types";
import { getHeaderHeight } from "../../utils/helpers";

const ListOnMap = () => {
  const [gotCoordinate, setGotCoordinate] = useState(false);
  const [coordinates, setCoordinates] = useState<CoordinatesProps>();

  const onGetCoordinateSuccess = (position: GeolocationPosition) => {
    setCoordinates({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    setGotCoordinate(true);
  };

  const onGetCoordinateFailed = (err: any) => {
    setCoordinates(DEFAULT_COORDINATES);
    setGotCoordinate(true);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onGetCoordinateSuccess,
      onGetCoordinateFailed,
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return gotCoordinate ? (
    <div
      className=" w-full bg-gray-50 z-10 h-screen flex md:flex-row flex-col-reverse"
      style={{
        paddingTop: getHeaderHeight() + "px",
      }}
    >
      <div className=" w-full h-full">Hello</div>
      <div className={` h-40-screen md:h-full w-full md:w-4/5`}>
        <MapWithFlags coordinates={coordinates} draggable={true} />
      </div>
    </div>
  ) : (
    <div className=" flex flex-col w-full h-screen items-center justify-center p-4">
      <LocationIcon />
      <p className=" font-semibold text-center mt-4">Permission required</p>
      <p className=" text-center">
        For better user experience, we use your location to find nearby users
        who need help.
        <br />
      </p>
      <p className=" text-primary font-semibold mt-6 text-center">
        We do not and will never store or track this information.
      </p>
    </div>
  );
};
export default ListOnMap;
