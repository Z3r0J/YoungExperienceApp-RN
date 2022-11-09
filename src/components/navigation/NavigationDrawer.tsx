import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';
import {FormAppComponent} from '../formApp/FormAppComponent';
import {HomeComponent} from '../home/HomeComponent';
import {ExperienceComponent} from '../YoungExperience/ExperienceComponent';
import {ExperienceDetails} from '../YoungExperience/ExperienceDetails';
import {HeaderNavigation} from './HeaderNavigation';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export const NavigationDrawer = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: isDarkMode ? 'white' : 'black',
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeComponent}
        options={{
          drawerItemStyle: {marginTop: 25},
          drawerIcon: () => (
            <Icon
              name="home-sharp"
              size={28}
              color={isDarkMode ? '#0099E6' : '#00CEE6'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ListExperience"
        component={ExperienceComponent}
        options={{
          drawerItemStyle: {marginTop: 15},
          headerRight: () => (
            <HeaderNavigation component={'FormApp'} title={'Create new'} />
          ),
          title: 'Experience List',
          drawerIcon: () => (
            <Icon
              name="reader-sharp"
              size={28}
              color={isDarkMode ? '#0099E6' : '#00CEE6'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FormApp"
        component={FormAppComponent}
        options={{
          drawerItemStyle: {marginTop: 15},
          headerRight: () => (
            <HeaderNavigation
              component={'ListExperience'}
              title={'Back To List'}
            />
          ),
          title: 'New Experience',
          drawerIcon: () => (
            <Icon
              name="md-add-circle-sharp"
              size={28}
              color={isDarkMode ? '#0099E6' : '#00CEE6'}
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
          drawerItemStyle: {display: 'none'},
        }}
      />
    </Drawer.Navigator>
  );
};
