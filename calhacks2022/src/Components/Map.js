import React, { Component } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

function Map(props) {
  function getNearestCity() {
    return "apples";
  }

  const libraries = ["places"];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCLdIa6-k1T6ezYBWLxa6o1NfukLxggROE",
    libraries: libraries,
  });

  if (loadError) return "Error Loading Map";
  if (!isLoaded) return "Loading Maps";

  const mapContainerStyle = {
    width: "500px",
    height: "500px",
  };

  if (props.data) {
    var center = { lat: props.data.lat, lng: props.data.lng };
  }

  return (
    <section id="map">
      {" "}
      "sample test for map" + {getNearestCity()}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      ></GoogleMap>
    </section>
  );
}

export default Map;
