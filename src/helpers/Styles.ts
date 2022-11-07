import {StyleSheet} from 'react-native';

export const Styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    viewHome: {
      backgroundColor: 'rgb(239,145,0)',
      height: '100%',
      marginStart: 5,
      marginEnd: 5,
      borderRadius: 8,
    },
    imageHome: {
      width: '100%',
      height: '65%',
    },
    principalTextHome: {
      textAlign: 'center',
      color: isDarkMode ? 'white' : 'black',
      fontSize: 28,
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
  });
