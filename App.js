import React, { Component } from 'react';
import { StatusBar } from 'react-native'
import AppContainer from './src/AppNavigation';

export default class App extends Component {
  componentWillMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
       <>
        {/* <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} /> */}
        <AppContainer />
       </>

    );
  }
}
