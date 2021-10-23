import React, { Component } from 'react';
import './App.css';
import './PreferencesBar.css';
import 'semantic-ui-css/semantic.min.css'
import Map from './Components/Map';
import PreferencesBar from './Components/PreferencesBar';
import SearchBox from './Components/SearchBox';
import background from "./web-background.png";

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            // Add preference states here
            // Berkeley is default state
            city: 'Berkeley'
        };
    }

    // For data ={}, add any states needed
    render() {
        return (
            <div className="App" style={{
                backgroundImage: `url(${background})`
            }}>
                <PreferencesBar data={this.state}/>
                <Map data={this.state}/>
                <SearchBox data={this.state}/>

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

