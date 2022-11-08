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
import Icon from 'react-native-vector-icons/Ionicons';
import EnIcon from 'react-native-vector-icons/Entypo';

export const FormAppComponent = () => {
  const [newPhoto, setNewPhoto] = useState<boolean>(false);
  const [isGrabando, setIsGrabando] = useState<boolean>(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const camera = useRef<Camera>(null);
  const isDarkMode = useColorScheme() === 'dark';

  if (device == null) return <Text>No camera available</Text>;

  return (
    <ScrollView style={Styles(isDarkMode).viewForm}>
      <Text>Title: </Text>
      <TextInput />
      <Text>Description: </Text>
      <TextInput />
      <View style={{flex: 2, flexDirection: 'row', marginTop: 15}}>
        <Text style={Styles(isDarkMode).formTextContainer}>Take Photo: </Text>
        <TouchableOpacity
          onPress={() => setNewPhoto(!newPhoto)}
          style={Styles(isDarkMode).cardButton}>
          <Icon
            name={newPhoto ? 'camera' : 'md-camera-outline'}
            color={'#000'}
            size={24}></Icon>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          marginTop: 15,
          marginBottom: 10,
        }}>
        <Text style={Styles(isDarkMode).formTextContainer}>Record Audio</Text>
        <TouchableOpacity
          onPress={async () => {
            await RecordAudio(isGrabando).then(async r => {
              setIsGrabando(r[0]);
            });
          }}
          style={Styles(isDarkMode).formButton}>
          <EnIcon
            name={isGrabando ? 'controller-stop' : 'controller-play'}
            size={24}></EnIcon>
        </TouchableOpacity>
      </View>

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
            }}
            style={Styles(isDarkMode).cameraButton}>
            <Icon name="disc-outline" size={35} color={'red'} />
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};
