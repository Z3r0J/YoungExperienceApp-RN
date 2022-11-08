import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import {Styles} from '../../helpers/Styles';

export const ExperienceItems = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={Styles(isDarkMode).cardBackground}>
      <Text>{props.item.title}</Text>
    </View>
  );
};
