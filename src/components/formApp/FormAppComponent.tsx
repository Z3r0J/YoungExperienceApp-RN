import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {TakePhoto} from '../../helpers/TakePhoto';

export const FormAppComponent = () => {
  const [newPhoto, setNewPhoto] = useState<boolean>(false);
  const [newAudio, setNewAudio] = useState<boolean>(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const camera = useRef<Camera>(null);
  if (device == null) return <Text>No camera available</Text>;

  return (
    <ScrollView>
      {newPhoto && (
        <>
          <Camera
            device={device}
            ref={camera}
            isActive={true}
            style={{width: '100%', height: 300}}
            photo={true}
          />
          <TouchableOpacity
            onPress={async () => {
              await TakePhoto(camera).then(() => {
                CameraRoll.getPhotos({
                  first: 250,
                  groupTypes: 'Album',
                  groupName: 'YoungLiving-App',
                  assetType: 'Photos',
                }).then();
              });
            }}>
            <Text>Tomar Foto</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};
