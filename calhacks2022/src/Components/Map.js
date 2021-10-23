import React, { Component } from 'react';

class Map extends Component {

    getNearestCity() {
        return "apples";
    }

    render() {

        if(this.props.data){
            // add any needed states
        }

        return (
        <section id="map"> "sample test for map" + {this.getNearestCity()} </section>
        );
    }
}

export default Map;