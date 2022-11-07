import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export const HeaderNavigation = (props: any) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        marginEnd: 12,
        marginStart: 8,
        backgroundColor: 'rgb(239,145,0)',
        padding: 8,
        borderRadius: 9,
      }}
      onPress={() => {
        navigation.navigate(props.component);
      }}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};
