import 'react-native-gesture-handler';
import React from 'react';
import Screen from './src/screens/ScreenRaw';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Screen />
    </NavigationContainer>
  );
}
