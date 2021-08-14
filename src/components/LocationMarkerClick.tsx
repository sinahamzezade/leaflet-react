import React from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../shared/store";

const LocationMarkerOnClick = () => {
  const dispatch = useDispatch<Dispatch>();
  const { coordinate } = useSelector((state: RootState) => state.map);

  useMapEvents({
    click(e) {
      dispatch.map.setCoordinate([e.latlng.lat, e.latlng.lng]);
      dispatch.map.toggleModal(true);
      dispatch.map.setEditableMarkerId(null);
    },
  });
  if (!coordinate) return <></>;

  return <Marker position={coordinate} />;
};

export default LocationMarkerOnClick;
