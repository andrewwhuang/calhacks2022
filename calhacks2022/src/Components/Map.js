import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function Map(props) {
  const containerStyle = {
    width: "500px",
    height: "500px",
  };

  const center = {
    lat: props.data.lat,
    lng: props.data.lng,
  };

  const [marker, setMarker] = useState({});

  const addMarker = (coords) => {
    setMarker((marker) => (marker = { coords }));
    // props.data.destLat = coords.lat;
    // props.data.destLng = coords.lng;
    props.action(coords.lat, coords.lng);
  };

  return (
    <section id="map">
      <LoadScript googleMapsApiKey="AIzaSyCLdIa6-k1T6ezYBWLxa6o1NfukLxggROE">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={9}
          onClick={(e) => addMarker(e.latLng.toJSON())}
        >
          <Marker position={marker.coords} />
        </GoogleMap>
      </LoadScript>
    </section>
  );
}

export default Map;
