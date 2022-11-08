import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export const getAudio = async () => {
  const audio = await (
    await CameraRoll.getPhotos({
      first: 20,
      groupTypes: 'Album',
      groupName: 'Audio',
      assetType: 'Videos',
    })
  ).edges[0];

  return audio;
};
