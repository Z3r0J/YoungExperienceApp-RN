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
    viewForm: {
      backgroundColor: 'rgb(239,145,0)',
      height: '75%',
      marginStart: 14,
      marginEnd: 14,
      marginTop: 25,
      borderRadius: 8,
      padding: 14,
    },

    cardBackground: {
      backgroundColor: isDarkMode ? '#fff' : '#000',
      marginStart: 5,
      borderRadius: 8,
      marginEnd: 5,
      marginTop: 10,
      padding: 18,
      flexDirection: 'row',
      flex: 2,
    },
    cardText: {
      color: isDarkMode ? 'black' : 'white',
      fontSize: 18,
      fontFamily: 'Poppins-Regular',
      fontWeight: '700',
    },
    cardTextContainer: {
      width: '75%',
      alignSelf: 'flex-start',
    },
    formTextContainer: {
      width: '75%',
      alignSelf: 'flex-start',
    },
    cardButton: {
      backgroundColor: isDarkMode ? 'black' : 'white',
      alignSelf: 'flex-end',
      padding: 13,
      borderRadius: 9,
    },
    formButton: {
      backgroundColor: isDarkMode ? 'black' : 'white',
      alignSelf: 'flex-end',
      padding: 13,
      borderRadius: 9,
    },
    imageHome: {
      width: '100%',
      height: '65%',
    },
    principalTextHome: {
      textAlign: 'center',
      color: isDarkMode ? 'black' : 'white',
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
    cameraButton: {
      backgroundColor: isDarkMode ? 'white' : 'black',
      width: 38,
      borderRadius: 18,
      marginTop: -55,
      alignSelf: 'center',
    },
  });
