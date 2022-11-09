import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';
import {Image, Text, useColorScheme, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import {Styles} from '../../helpers/Styles';

export const ExperienceDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ScrollView style={Styles(isDarkMode).viewForm}>
      <Text
        style={{
          color: 'white',
          fontFamily: 'OpenSans-Regular',
          alignSelf: 'center',
          marginBottom: 10,
          marginTop: 8,
          fontSize: 28,
          fontWeight: '700',
        }}>
        {route.params?.data.title}
      </Text>
      {route.params?.data.PhotoUrl && (
        <Image
          source={{uri: route.params?.data.PhotoUrl}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 500,
            marginBottom: 50,
            borderRadius: 10,
          }}
        />
      )}

      {route.params?.data.AudioUrl && (
        <VideoPlayer
          video={{uri: route.params?.data.AudioUrl}}
          videoWidth={500}
          videoHeight={50}
        />
      )}
      <Text
        style={{
          color: 'white',
          fontFamily: 'OpenSans-Regular',
          marginBottom: 10,
          marginTop: 12,
          fontSize: 24,
          padding: 8,
          fontWeight: '700',
        }}>
        {route.params?.data.description}
      </Text>
    </ScrollView>
  );
};
