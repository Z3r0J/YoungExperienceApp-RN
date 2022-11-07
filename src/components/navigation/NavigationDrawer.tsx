import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';
import {FormAppComponent} from '../formApp/FormAppComponent';
import {HomeComponent} from '../home/HomeComponent';
import {ExperienceComponent} from '../YoungExperience/ExperienceComponent';

const Drawer = createDrawerNavigator();

export const NavigationDrawer = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: isDarkMode ? 'white' : 'black',
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginEnd: 12,
              marginStart: 8,
              backgroundColor: 'rgb(239,145,0)',
              padding: 8,
              borderRadius: 9,
            }}
            onPress={() => {
              navigation.navigate('ListExperience');
            }}>
            <Text>History List</Text>
          </TouchableOpacity>
        ),
      }}>
      <Drawer.Screen name="Home" component={HomeComponent} />
      <Drawer.Screen name="ListExperience" component={ExperienceComponent} />
      <Drawer.Screen
        name="FormApp"
        component={FormAppComponent}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginEnd: 12,
                marginStart: 8,
                backgroundColor: 'rgb(239,145,0)',
                padding: 8,
                borderRadius: 9,
                borderTopEndRadius: 55,
                borderBottomEndRadius: 65,
              }}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Text>Back to List</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
