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
            // We might need to hard-code Berkeley - the API doesn't return a nearby airport for some reason
            //   city: "Berkeley",
            lat: 37.871666, //will be got from the location api
            lng: -122.272781,
            destLat: 0, //just default values that are set when a marker is dropped
            destLng: 0,

            // Data used for calling flight + hotel api's
            originCity: "Vancouver",
            originCountry: "CA",
            city: "Tokyo",
            country: "JP",
            startDate: "2021-12-01",
            endDate: null,
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
