import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Styles} from '../../helpers/Styles';

export const ExperienceItems = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={Styles(isDarkMode).cardBackground}>
      <View style={Styles(isDarkMode).cardTextContainer}>
        <Text style={Styles(isDarkMode).cardText} onPress={() => {}}>
          {props.item.title}
        </Text>
        <Text style={Styles(isDarkMode).cardText}>
          {props.item.date_actual}
        </Text>
      </View>
      <TouchableOpacity style={Styles(isDarkMode).cardButton}>
        <Text style={Styles(isDarkMode).secondTextHome}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};
