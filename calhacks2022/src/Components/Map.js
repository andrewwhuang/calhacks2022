import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

function Map(props) {
  Geocode.setApiKey("AIzaSyCLdIa6-k1T6ezYBWLxa6o1NfukLxggROE");
  Geocode.setLocationType("APPROXIMATE");

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
    props.data.destLat = coords.lat;
    props.data.destLng = coords.lng;
    // remove later
    console.log(coords);
    Geocode.fromLatLng(coords.lat, coords.lng).then(
      (response) => {
        let city, state, country;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
              default:
                break;
            }
          }
        }
        //temporary error handling
        if (!city) {
          console.error("Select a City");
        }
        props.data.city = city;
        props.data.state = state;
        props.data.country = country;
        // remove later
        console.log(city, state, country);
      },
      (error) => {
        console.error("Please try again");
      }
    );
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
