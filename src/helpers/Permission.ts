import {PermissionsAndroid} from 'react-native';

export const handleStorage = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);

  return status === 'granted';
};
export const handleRecord = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);

  return status === 'granted';
};

export const handleCamera = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);

  return status === 'granted';
};
