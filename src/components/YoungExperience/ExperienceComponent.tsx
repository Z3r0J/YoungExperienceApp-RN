import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {useDbContext} from '../../contexts/DbContext';

export const ExperienceComponent = () => {
  const db = useDbContext();

  const focusEffect = useCallback(() => {
    const fetchDb = () => {
      try {
      } catch (error) {}
    };
  }, []);

  useFocusEffect(focusEffect);

  return (
    <View>
      <Text>ExperienceComponent</Text>
    </View>
  );
};
