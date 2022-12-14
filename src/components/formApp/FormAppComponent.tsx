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
import {set} from 'react-native-reanimated';
import {useDbContext} from '../../contexts/DbContext';
import {useNavigation} from '@react-navigation/native';

export const FormAppComponent = () => {
  const [newPhoto, setNewPhoto] = useState<boolean>(false);
  const [isGrabando, setIsGrabando] = useState<boolean>(false);
  const [tiroPhoto, setTiroPhoto] = useState<boolean>(false);
  const [graboAudio, setGraboAudio] = useState<boolean>(false);
  const navigation = useNavigation();
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
      insertExperience(userData, db).then(async () => {
        Alert.alert(
          'Added',
          'That was added correctly without Photo or Audio',
          [
            {
              text: 'OK',
              onPress: () => {
                clearAll();
                navigation.navigate('ListExperience', {});
              },
            },
          ],
        );
      });
      return;
    }
    if (tiroPhoto) {
      const photos = await getPhoto().then(p => {
        return p.node.image.uri;
      });
      setUserData({...userData, PhotoUrl: photos});
      console.log(userData);
    }

    if (graboAudio && tiroPhoto) {
      userData.PhotoUrl &&
        insertExperience(userData, db).then(async () => {
          Alert.alert(
            'Added',
            'That was added correctly with Photo and Audio',
            [
              {
                text: 'OK',
                onPress: async () => {
                  clearAll();
                  navigation.navigate('ListExperience', {});
                },
              },
            ],
          );
        });
    }

    if (graboAudio && !tiroPhoto) {
      userData.AudioUrl &&
        insertExperience(userData, db).then(async () => {
          Alert.alert('Added', 'That was added correctly with Audio', [
            {
              text: 'OK',
              onPress: () => {
                clearAll();
                navigation.navigate('ListExperience', {});
              },
            },
          ]);
        });
    }

    if (!graboAudio && tiroPhoto) {
      userData.PhotoUrl &&
        insertExperience(userData, db).then(async () => {
          Alert.alert('Added', 'That was added correctly with Photo.', [
            {
              text: 'OK',
              onPress: () => {
                clearAll();
                navigation.navigate('ListExperience', {});
              },
            },
          ]);
        });
    }
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  const clearAll = () => {
    setGraboAudio(false);
    setTiroPhoto(false);
    setUserData({
      AudioUrl: '',
      PhotoUrl: '',
      date_actual: '',
      description: '',
      id: 0,
      title: '',
    });
  };

  if (device == null) return <Text>No camera available</Text>;

  return (
    <ScrollView style={Styles(isDarkMode).viewForm}>
      <Text style={Styles(isDarkMode).formText}>Title: </Text>
      <TextInput
        style={Styles(isDarkMode).formInput}
        value={userData.title}
        onChangeText={e => {
          setUserData({...userData, title: e, date_actual: currentDate});
        }}
      />
      <Text style={Styles(isDarkMode).formText}>Description: </Text>
      <TextInput
        value={userData.description}
        style={Styles(isDarkMode).formInput}
        onChangeText={e => {
          setUserData({...userData, description: e});
        }}
      />
      <View style={{flex: 2, flexDirection: 'row', marginTop: 15}}>
        <Text style={Styles(isDarkMode).formText}>Take Photo: </Text>
        <TouchableOpacity
          onPress={() => setNewPhoto(!newPhoto)}
          style={Styles(isDarkMode).cardButton}>
          <Icon
            name={newPhoto ? 'camera' : 'md-camera-outline'}
            color={isDarkMode ? 'white' : 'black'}
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
        <Text style={Styles(isDarkMode).formText}>Record Audio</Text>
        <TouchableOpacity
          onPress={async () => {
            await RecordAudio(isGrabando).then(async r => {
              setIsGrabando(r.booleano);
              setGraboAudio(true);
              setUserData({...userData, AudioUrl: r.uri});
            });
          }}
          style={Styles(isDarkMode).formButton}>
          <EnIcon
            name={isGrabando ? 'controller-stop' : 'controller-play'}
            color={isDarkMode ? 'white' : 'black'}
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
        }}
        style={{
          marginTop: 35,
          backgroundColor: isDarkMode ? 'black' : 'white',
          alignSelf: 'center',
          padding: 18,
          borderRadius: 10,
        }}>
        <Text style={Styles(isDarkMode).formText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
