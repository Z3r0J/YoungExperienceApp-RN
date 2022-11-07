/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useColorScheme, PermissionsAndroid, Platform} from 'react-native';
import {NavigationDrawer} from './src/components/navigation/NavigationDrawer';
import {
  handleCamera,
  handleRecord,
  handleStorage,
} from './src/helpers/Permission';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(239,109,0)',
    },
  };

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'rgb(239,145,0)',
      border: 'rgb(189,157,120)',
    },
  };

  useEffect(() => {
    const handlePermissions = async () => {
      if (Platform.OS === 'android' && !(await handleStorage())) {
        return;
      } else if (Platform.OS === 'android' && !(await handleRecord())) {
        return;
      } else if (Platform.OS === 'android' && !(await handleCamera())) {
        return;
      }
    };

    handlePermissions();
  }, []);

  return (
    <NavigationContainer theme={isDarkMode ? MyDarkTheme : MyLightTheme}>
      <NavigationDrawer />
    </NavigationContainer>
  );
};

export default App;
