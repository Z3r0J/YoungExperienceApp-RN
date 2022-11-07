import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Camera} from 'react-native-vision-camera';

export const TakePhoto = async (camera: React.RefObject<Camera>) => {
  const photo = await camera.current
    ?.takePhoto({
      flash: 'on',
    })
    .then(res => {
      const url = `file://${res?.path}`;
      CameraRoll.save(url, {
        type: 'photo',
        album: 'YoungLiving-App',
      });
    })
    .then(() => {
      CameraRoll.getPhotos({
        first: 250,
        groupTypes: 'Album',
        groupName: 'YoungLiving-App',
        assetType: 'Photos',
      }).then(r => {
        return r.edges;
      });
    });

  return photo;
};
