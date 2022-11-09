import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useCallback} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useDbContext} from '../../contexts/DbContext';
import {Styles} from '../../helpers/Styles';
import {
  Experience,
  getAllExperience,
  insertExperience,
  truncateExperience,
} from '../../services/ExperienceServices';
import {ExperienceItems} from './ExperienceItems';

export const ExperienceComponent = () => {
  const [experience, setExperience] = useState<Experience[]>();
  const [error, setError] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';
  const db = useDbContext();
  const navigation = useNavigation();

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
      {experience && (
        <TouchableOpacity
          style={Styles(isDarkMode).deleteAllButton}
          onPress={async () => {
            try {
              await truncateExperience(db).then(() =>
                Alert.alert(
                  'Delete correctly',
                  'All History was delete correctly',
                  [{onPress: () => navigation.navigate('Home')}],
                ),
              );
            } catch (error) {
              console.log(error);
            }
          }}>
          <Text style={Styles(isDarkMode).deleteAllText}>
            Delete all experience
          </Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={experience}
        renderItem={item => <ExperienceItems item={item.item} />}
        style={{marginTop: 8}}
      />
    </View>
  );
};
