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

    cardBackground: {
      backgroundColor: '#fff',
      marginStart: 5,
      borderRadius: 8,
      marginEnd: 5,
      marginTop: 10,
      padding: 18,
      color: 'black',
    },

    imageHome: {
      width: '100%',
      height: '65%',
    },
    principalTextHome: {
      textAlign: 'center',
      color: isDarkMode ? 'white' : 'black',
      fontSize: 28,
      fontWeight: '700',
      fontFamily: 'Lato-Regular',
      textTransform: 'capitalize',
    },
    secondTextHome: {
      textAlign: 'center',
      color: isDarkMode ? 'white' : 'black',
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      fontWeight: '600',
    },
    gettingStartedButton: {
      alignSelf: 'center',
      color: isDarkMode ? 'white' : 'black',
      backgroundColor: '#000',
      marginTop: 15,
      padding: 18,
      borderRadius: 10,
    },
    gettingStartedText: {
      color: isDarkMode ? 'white' : 'black',
      fontSize: 16,
      fontFamily: 'Lato-Regular',
    },
  });
