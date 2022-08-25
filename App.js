import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Tabs from './src/navigations/tabs';
const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer style={{position: 'absolute'}}>
          <Tabs />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};
export default App;
