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
            // Default values that are set when a marker is dropped
            destCity: "Tokyo",
            destState: "",
            destCountry: "JP",
            lat: 37.871666, //will be got from the location api
            lng: -122.272781,
            destLat: 0, //just default values that are set when a marker is dropped
            destLng: 0,
            startDate: new Date().toISOString().slice(0, 10),
            endDate: null,

            originCity: "Vancouver",
            originCountry: "CA",
        };
    }

    // For data ={}, add any states needed
    render() {
        return (
            <div
                className="App"
            >
                <PreferencesBar
                    data={this.state}
                    startDate={this.editStart}
                    endDate={this.editEnd}
                />
                <div className="mainContainer">
                    <Map data={this.state} action={this.mapInfoSetter} />
                    <SearchBox data={this.state} />
                </div>
            </div>
        );
    }

    mapInfoSetter = (lat, long, city, state, country) => {
        this.setState({
            destLat: lat,
            destLng: long,
            destCity: city,
            destState: state,
            destCountry: country,
        });
    };

    editStart = (date) => {
        this.setState({
            startDate: date,
        });
    };

    editEnd = (date) => {
        this.setState({
            endDate: date,
        });
    };
}

export default App;
