import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useRef, useState} from 'react';
import {
  Alert,
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
import {
  Experience,
  getAllExperience,
  insertExperience,
  truncateExperience,
  updateData,
} from '../../services/ExperienceServices';
import {getPhoto} from '../../helpers/getPhotoUrl';
import {getAudio} from '../../helpers/getAudio';
import {set} from 'react-native-reanimated';
import {useDbContext} from '../../contexts/DbContext';

export const FormAppComponent = () => {
  const [newPhoto, setNewPhoto] = useState<boolean>(false);
  const [isGrabando, setIsGrabando] = useState<boolean>(false);
  const [tiroPhoto, setTiroPhoto] = useState<boolean>(false);
  const [graboAudio, setGraboAudio] = useState<boolean>(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const camera = useRef<Camera>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [userData, setUserData] = useState<Experience>({
    id: 0,
    title: '',
    date_actual: '',
    AudioUrl: '',
    description: '',
    PhotoUrl: '',
  });
  const db = useDbContext();

  const handleSubmit = async () => {
    if (userData.title === '') {
      Alert.alert('Title is missing.', 'Please complete the title');
      return;
    } else if (userData.description === '') {
      Alert.alert('Description is missing.', 'Please complete the description');
      return;
    }

    if (!tiroPhoto && !graboAudio) {
      insertExperience(userData, db);
      return;
    }
    if (tiroPhoto) {
      const photos = await getPhoto().then(p => {
        return p.node.image.uri;
      });
      setUserData({...userData, PhotoUrl: photos});
    }

    if (graboAudio) {
      userData.PhotoUrl &&
        insertExperience(userData, db).then(async () => {
          Alert.alert('Ya se agrego');
          await updateData(
            userData.PhotoUrl,
            (
              await getAudio()
            ).node.image.uri,
            db,
          ).then(r => console.log(r));
        });
    } else {
      insertExperience(userData, db);
    }
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  if (device == null) return <Text>No camera available</Text>;

  return (
    <ScrollView style={Styles(isDarkMode).viewForm}>
      <Text>Title: </Text>
      <TextInput
        onChangeText={e => {
          setUserData({...userData, title: e, date_actual: currentDate});
        }}
      />
      <Text>Description: </Text>
      <TextInput
        onChangeText={e => {
          setUserData({...userData, description: e});
        }}
      />
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
              setGraboAudio(true);
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
            style={{width: '100%', height: 300, borderRadius: 8}}
            photo={true}
          />
          <TouchableOpacity
            onPress={async () => {
              await TakePhoto(camera).then(() => {
                setNewPhoto(!newPhoto);
                setTiroPhoto(true);
              });
            }}
            style={Styles(isDarkMode).cameraButton}>
            <Icon name="disc-outline" size={35} color={'red'} />
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        onPress={() => {
          handleSubmit();
        }}>
        <Text>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
