import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useState} from 'react';
import SoundRecorder from 'react-native-sound-recorder';

export const RecordAudio = (isGrabando: boolean) => {
  let uri = '';
  if (!isGrabando) {
    SoundRecorder.start(
      `${SoundRecorder.PATH_DOCUMENT}/${Date.now()}.mp4`,
    ).then(function () {
      console.log('started recording');
    });
    return [!isGrabando];
  }

  SoundRecorder.stop().then(function (result) {
    const url = `file://${result.path}`;
    CameraRoll.save(url, {type: 'auto', album: 'Audio'}).then(r =>
      console.log(r),
    );
  });

  return [false];
};
