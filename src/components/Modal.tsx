/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../shared/store";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { v4 } from "uuid";

const Modal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { editableMarkerId, locations, coordinate, showModal } = useSelector(
    (state: RootState) => state.map
  );

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("business");
  const [image, setImage] = useState<string>("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (name && coordinate && type) {
      try {
        dispatch.map.addLocation({
          name,
          coordinate,
          type,
          id: v4(),
          image,
        });

        reset();
        alert("Location submitted ");
      } catch (err) {
        console.log("On submit error: ", err);
      }
    }
  };

  const handleUpdate = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const locationIndex = locations.findIndex(
      (location) => location.id === editableMarkerId
    );

    const selectedItem = locations.find(
      (location) => location.id === editableMarkerId
    );

    try {
      if (selectedItem && editableMarkerId) {
        dispatch.map.updateLocation({
          index: locationIndex,
          image,
          name,
          coordinate: selectedItem?.coordinate,
          type,
          id: editableMarkerId,
        });
        alert("Location updated ");
      }
    } catch (err) {
      console.log("On update err:", err);
    }
  };

  const handleRemove = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!editableMarkerId) return;
    const locationIndex = locations.findIndex(
      (location) => location.id === editableMarkerId
    );
    dispatch.map.removeLocation({ index: locationIndex });
    reset();
  };

  const UpdateCenter = () => {
    const map = useMap();
    if (coordinate) map.setView(coordinate);
    return null;
  };

  const checkForm = useMemo(() => {
    if (coordinate === null) return true;
    if (!name) return true;
    if (!type) return true;
    return false;
  }, [name, coordinate, type]);

  useEffect(() => {
    const markerItem = locations.find(
      (location) => location.id === editableMarkerId
    );
    if (markerItem) {
      setName(markerItem.name);
      setType(markerItem.type);
    }
  }, [editableMarkerId]);

  useEffect(() => {
    if (editableMarkerId) {
      reset();
    }
  }, [coordinate]);

  const reset = () => {
    setName("");
    setImage("");
    setType("business");
    dispatch.map.toggleModal(false);
  };

  const handleFileUpload = (event: any) => {
    event.preventDefault();
    const { files } = event.target;
    const localImageUrl = window.URL.createObjectURL(files[0]);

    setImage(localImageUrl);
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal--title">
            <h3>Share Location</h3>
            <button onClick={reset}>Close</button>
          </div>
          <div className="modal--content">
            <form onSubmit={editableMarkerId ? handleUpdate : handleSubmit}>
              <div className="form--row">
                <p>Location name*: </p>
                <input value={name} onChange={(v) => setName(v.target.value)} />
              </div>
              {coordinate && (
                <div className="form--row">
                  <p>Location on map*:</p>
                  <MapContainer
                    center={coordinate || [51.505, -0.09]}
                    zoom={16}
                    scrollWheelZoom={false}
                    style={{ width: "100%", height: 220 }}
                    doubleClickZoom={false}
                    zoomControl={false}
                    dragging={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {coordinate && (
                      <>
                        <Marker position={coordinate} />
                        <UpdateCenter />
                      </>
                    )}
                  </MapContainer>
                </div>
              )}
              <div className="form--row">
                <p>Location type</p>
                <select onChange={(e) => setType(e.target.value)} value={type}>
                  <option value="business">Buiness</option>
                  <option value="shop">Shop</option>
                  <option value="store">Store</option>
                </select>
              </div>

              <div className="form--row">
                <p>Logo</p>
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  onChange={handleFileUpload}
                />
              </div>
              <div className="actions">
                {editableMarkerId && (
                  <button className="danger" onClick={handleRemove}>
                    Remove
                  </button>
                )}

                <button type="submit" className="success" disabled={checkForm}>
                  {editableMarkerId ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
