import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Location } from "../shared/store/models/map";
import { useSelector } from "react-redux";
import Content from "./Content";
import { RootState } from "../shared/store";

type Props = {
  location: Location;
  map: any;
};

const LocationMarker = ({ location, map }: Props) => {
  const { coordinate } = useSelector((state: RootState) => state.map);
  if (!coordinate) return <></>;
  const closePopup = () => {
    map.closePopup();
  };

  if (!location.coordinate) return <></>;

  return (
    <Marker position={location.coordinate}>
      <Popup keepInView closeOnEscapeKey minWidth={140} closeButton={false}>
        <Content
          type={location.type}
          name={location.name}
          coordinate={location.coordinate}
          id={location.id}
          image={location.image}
          closePopup={closePopup}
        />
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
