import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useCallback} from 'react';
import {Text, View} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useDbContext} from '../../contexts/DbContext';
import {
  Experience,
  getAllExperience,
  insertExperience,
} from '../../services/ExperienceServices';
import {ExperienceItems} from './ExperienceItems';

export const ExperienceComponent = () => {
  const [experience, setExperience] = useState<Experience[]>();
  const [error, setError] = useState(null);
  const db = useDbContext();

  const focusEffect = useCallback(() => {
    const fetchDb = async () => {
      try {
        const experiences = await getAllExperience(db);
        experiences.map(e => console.log(e.title));
        setExperience(experiences);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };
    fetchDb();
  }, []);

  useFocusEffect(focusEffect);

  return (
    <View>
      <FlatList
        data={experience}
        renderItem={item => <ExperienceItems item={item.item} />}
        style={{marginTop: 8}}
      />
    </View>
  );
};
