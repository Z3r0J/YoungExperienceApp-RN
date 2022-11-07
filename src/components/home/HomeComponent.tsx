import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useRef, useState} from 'react';
import {Button, Image, Text, useColorScheme, View} from 'react-native';
import {Styles} from '../../helpers/Styles';

export const HomeComponent = () => {
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
    </View>
  );
};
