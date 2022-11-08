import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';

export const ExperienceDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        <Text>Hi</Text>;
      },
    });
  }, []);

  return (
    <View>
      <Image
        source={{uri: route.params?.data.PhotoUrl}}
        resizeMode="cover"
        style={{width: 500, height: 500}}
      />
    </View>
  );
};
