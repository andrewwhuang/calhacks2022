import React, { Component } from "react";

class Map extends Component {
  getNearestCity() {
    return "apples";
  }

  render() {
    if (this.props.data) {
      var lat = this.props.data.lat;
      var lng = this.props.data.lng;
    }

    return (
      <section id="map">
        {" "}
        "sample test for map" + {this.getNearestCity()}
        <div className="google-map-code">
          <iframe
            src={
              "https://www.google.com/maps/embed/v1/view?key=AIzaSyCLdIa6-k1T6ezYBWLxa6o1NfukLxggROE&center=" +
              lat +
              "," +
              lng +
              "&zoom=9"
            }
            width="600"
            height="450"
            frameborder="0"
            style={{ border: 0 }}
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>
      </section>
    );
  }
}

export default Map;
