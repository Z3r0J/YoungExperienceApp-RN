import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';

export const HeaderNavigation = (props: any) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      style={{
        marginEnd: 12,
        marginStart: 8,
        backgroundColor: isDarkMode ? '#0099E6' : '#00CEE6',
        padding: 10,
        borderRadius: 9,
        height: 45,
      }}
      onPress={() => {
        navigation.navigate(props.component);
      }}>
      <Text style={{color: 'white'}}>{props.title}</Text>
    </TouchableOpacity>
  );
};
