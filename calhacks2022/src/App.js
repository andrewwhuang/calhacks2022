import React, { Component } from "react";
import "./App.css";
import "./PreferencesBar.css";
import "semantic-ui-css/semantic.min.css";
import Map from "./Components/Map";
import PreferencesBar from "./Components/PreferencesBar";
import SearchBox from "./Components/SearchBox";
import background from "./web-background.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Add preference states here
      // All locations are default and will change based on map marker
      // City one sometimes returns undefined if city is too far
      // Eventally probably need error handling to tell the user to select a proper city
      city: "Berkeley",
      state: "California",
      country: "United States",
      lat: 37.871666, //will be got from the location api
      lng: -122.272781,
      destLat: 0, //just default values that are set when a marker is dropped
      destLng: 0,
      destCity: "",
    };
  }

  // For data ={}, add any states needed
  render() {
    return (
      <div
        className="App"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <PreferencesBar data={this.state} />
        <Map data={this.state} />
        <SearchBox data={this.state} />

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default App;
