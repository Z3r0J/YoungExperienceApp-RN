import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useState} from 'react';
import {Alert} from 'react-native';
import SoundRecorder from 'react-native-sound-recorder';

export const RecordAudio = async (isGrabando: boolean) => {
  let url: string = '';
  if (!isGrabando) {
    await SoundRecorder.start(
      `${SoundRecorder.PATH_DOCUMENT}/${Date.now()}.mp4`,
    ).then(function () {
      console.log('started recording');
    });
    return {booleano: !isGrabando, uri: url};
  }

  await SoundRecorder.stop().then(function (result) {
    url = `file://${result.path}`;
  });

  Alert.alert('Audio Saved', 'You audio was saved.');

  return {booleano: false, uri: url};
};
