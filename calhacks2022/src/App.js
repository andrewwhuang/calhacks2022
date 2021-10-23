import React, { Component } from "react";
import "./App.css";
import Map from "./Components/Map";
import PreferencesBar from "./Components/PreferencesBar";
import SearchBox from "./Components/SearchBox";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Add preference states here
      // Berkeley is default state
      city: "Berkeley",
      lat: 37.871666,
      lng: -122.272781,
      destLat: 37.871666,
      destLng: -122.272781,
    };
  }

  // For data ={}, add any states needed
  render() {
    return (
      <div className="App">
        <PreferencesBar data={this.state} />
        <Map data={this.state} />
        <SearchBox data={this.state} />
      </div>
    );
  }
}

export default App;
