import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {useColorScheme} from 'react-native';
import {HomeComponent} from '../home/HomeComponent';

const Drawer = createDrawerNavigator();

export const NavigationDrawer = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerTintColor: isDarkMode ? 'white' : 'dark'}}>
      <Drawer.Screen name="Home" component={HomeComponent} />
    </Drawer.Navigator>
  );
};
