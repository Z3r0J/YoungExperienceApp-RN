import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useRef, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {TakePhoto} from '../../helpers/TakePhoto';

export const HomeComponent = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const camera = useRef<Camera>(null);
  const [image, setImage] = useState<string>('');
  if (device == null) return <Text>No camera available</Text>;

  return <View></View>;
};
