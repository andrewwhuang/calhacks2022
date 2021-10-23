import React, { Component } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

class Map extends Component {
  getNearestCity() {
    return "apples";
  }

  render() {
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

    if (this.props.data) {
      var center = { lat: this.props.data.lat, lng: this.props.data.lng };
    }

    return (
      <section id="map">
        {" "}
        "sample test for map" + {this.getNearestCity()}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
        ></GoogleMap>
      </section>
    );
  }
}

export default Map;
