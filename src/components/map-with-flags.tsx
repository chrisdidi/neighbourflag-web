import GoogleMapReact from "google-map-react";
import React from "react";
import { mapStyles } from "../mapStyles";
import { CoordinatesProps } from "../types/map.types";
import MapPin from "./map-pin";

interface IProps {
  width?: string;
  height?: string;
  draggable?: boolean;
  coordinates?: CoordinatesProps;
}
const MapWithFlags: React.FC<IProps> = ({
  coordinates,
  draggable = false,
  height = "100%",
  width = "auto",
}) => {
  return (
    <div className=" overflow-hidden" style={{ width, height }}>
      <GoogleMapReact
        defaultZoom={16}
        draggable={draggable}
        defaultCenter={coordinates}
        options={{
          zoomControl: false,
          panControl: false,
          scaleControl: false,
          fullscreenControl: false,
          styles: mapStyles,
        }}
        bootstrapURLKeys={{ key: "AIzaSyB1crnUi6ZfJeQ45sFQxwsp4HAX94A5t2s" }}
      >
        {coordinates && (
          <MapPin emoji={"👋"} lat={coordinates?.lat} lng={coordinates.lng} />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default MapWithFlags;
