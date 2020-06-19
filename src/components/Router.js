import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import HomeScreen from './home/Home';
import Colors from '../constants/Colors';
export default function RouterComponent() {
  return (
    <Router
      titleStyle={{fontSize: 20}}
      headerLayoutPreset="center"
      navigationBarStyle={{
        backgroundColor: Colors.minanceBlue,
        elevation: 1,
        borderBottomWidth: 0,
      }}>
      <Stack key="root">
        <Scene key="home" component={HomeScreen} initial title="Home" />
      </Stack>
    </Router>
  );
}
