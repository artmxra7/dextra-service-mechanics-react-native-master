import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import App from './app/App'

export default class DextraServiceMechanics extends Component {
  render() {
    return (
        <App/>
    );
  }
}

AppRegistry.registerComponent('DextraServiceMechanics', () => DextraServiceMechanics)
