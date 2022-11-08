import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export const getPhoto = async () => {
  const photos = await (
    await CameraRoll.getPhotos({
      first: 20,
      groupTypes: 'Album',
      groupName: 'YoungLiving-App',
      assetType: 'Photos',
    })
  ).edges[0];

  return photos;
};
