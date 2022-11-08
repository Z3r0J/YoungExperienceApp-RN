import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Styles} from '../../helpers/Styles';

export const ExperienceItems = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  return (
    <View style={Styles(isDarkMode).cardBackground}>
      <View style={Styles(isDarkMode).cardTextContainer}>
        <Text
          style={Styles(isDarkMode).cardText}
          onPress={() => {
            navigation.navigate('Details', {data: props.item});
          }}>
          {props.item.title}
        </Text>
        <Text style={Styles(isDarkMode).cardText}>
          {props.item.date_actual}
        </Text>
      </View>
      <TouchableOpacity
        style={Styles(isDarkMode).cardButton}
        onPress={() => {
          navigation.navigate('Details', {data: props.item});
        }}>
        <Text style={Styles(isDarkMode).secondTextHome}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};
