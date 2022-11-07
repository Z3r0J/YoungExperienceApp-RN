import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useRef, useState} from 'react';
import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Styles} from '../../helpers/Styles';

export const HomeComponent = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={Styles(isDarkMode).viewHome}>
      <Image
        source={require('../../../assets/images/homeImage.webp')}
        resizeMode="cover"
        style={Styles(isDarkMode).imageHome}
      />
      <Text style={Styles(isDarkMode).principalTextHome}>
        Young Experience App
      </Text>
      <Text style={Styles(isDarkMode).secondTextHome}>
        An app where you can, save you privacy and experience through the life.
      </Text>
      <TouchableOpacity
        style={Styles(isDarkMode).gettingStartedButton}
        onPress={() => {
          navigation.navigate('ListExperience');
        }}>
        <Text style={Styles(isDarkMode).gettingStartedText}>
          Getting Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};
