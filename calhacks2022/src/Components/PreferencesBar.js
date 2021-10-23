import React, { Component } from 'react';

class PreferencesBar extends Component {

  render() {

    if(this.props.data){
      var city = this.props.data.city;
    }

    return (
      <header id="home"> "Sample Text" + {city} </header>
    );
  }
}

export default PreferencesBar;
