import React, { Component } from 'react';

class PreferencesBar extends Component {

    getNearestCity() {
        return "apples";
    }

    render() {

        if(this.props.data){
            var city = this.props.data.city;
        }

        return (
            <header id="home"> "Sample Text" + {city} + {this.getNearestCity()} </header>
        );
    }
}

export default PreferencesBar;
