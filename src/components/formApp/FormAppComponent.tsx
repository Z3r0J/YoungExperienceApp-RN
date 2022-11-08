import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useRef, useState} from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {TakePhoto} from '../../helpers/TakePhoto';
import SoundRecorder from 'react-native-sound-recorder';
import {RecordAudio} from '../../helpers/RecordAudio';
import {Styles} from '../../helpers/Styles';

export const FormAppComponent = () => {
  const [newPhoto, setNewPhoto] = useState<boolean>(false);
  const [isGrabando, setIsGrabando] = useState<boolean>(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const camera = useRef<Camera>(null);
  const isDarkMode = useColorScheme() === 'dark';

  if (device == null) return <Text>No camera available</Text>;

  return (
    <View style={Styles(isDarkMode).viewForm}>
      <Text>Digite el titulo: </Text>
      <TextInput />
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
      <Button
        title={isGrabando ? 'Parar' : 'Grabar'}
        onPress={async () => {
          await RecordAudio(isGrabando).then(async r => {
            setIsGrabando(r[0]);
          });
        }}
      />
    </View>
  );
};
