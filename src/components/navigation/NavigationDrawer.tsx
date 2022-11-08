import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';
import {FormAppComponent} from '../formApp/FormAppComponent';
import {HomeComponent} from '../home/HomeComponent';
import {ExperienceComponent} from '../YoungExperience/ExperienceComponent';
import {ExperienceDetails} from '../YoungExperience/ExperienceDetails';
import {HeaderNavigation} from './HeaderNavigation';

const Drawer = createDrawerNavigator();

export const NavigationDrawer = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: isDarkMode ? 'white' : 'black',
      }}>
      <Drawer.Screen name="Home" component={HomeComponent} />
      <Drawer.Screen
        name="ListExperience"
        component={ExperienceComponent}
        options={{
          headerRight: () => (
            <HeaderNavigation component={'FormApp'} title={'Create new'} />
          ),
        }}
      />
      <Drawer.Screen
        name="FormApp"
        component={FormAppComponent}
        options={{
          headerRight: () => (
            <HeaderNavigation
              component={'ListExperience'}
              title={'Back To List'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Details"
        component={ExperienceDetails}
        options={{
          headerRight: () => (
            <HeaderNavigation
              component={'ListExperience'}
              title={'Back To List'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
