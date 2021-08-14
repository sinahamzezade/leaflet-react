import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useState } from "react";
import Modal from "../components/Modal";
import { RootState } from "../shared/store";
import LocationMarkerOnClick from "../components/LocationMarkerClick";
import LocationMarker from "../components/LocationMarker";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
  const { locations } = useSelector((state: RootState) => state.map);
  const [map, setMap] = useState<any>(null);

  return (
    <div id="container">
      <Modal />
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarkerOnClick />
        {locations &&
          locations.map((location) => (
            <LocationMarker
              key={`${location.coordinate}`}
              location={location}
              map={map}
            />
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
