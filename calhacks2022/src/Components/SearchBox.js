import React, { Component } from 'react';

class SearchBox extends Component {

    getNearestCity() {
        return "apples";
    }
    
    render() {

        if(this.props.data){
            // add any needed states
        }

        return (
        <section id="searchBox"> "sample test for SearchBox" + {this.getNearestCity()} </section>
        );
    }
}

export default SearchBox;