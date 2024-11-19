import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Optional dark overlay for better contrast
    },
    gradientTextContainer: {
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 30,
    },
    textStyle: {
      fontSize: 38,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Jaro', // Add the Jaro font family
      marginTop: 20, 
    },
    titleImage: {
      width: 360,  // Adjust width to your preference
      height: 238,  // Adjust height proportionally to your image
      marginBottom: 0,
      resizeMode: 'cover',
    },
    //pentru chenarul de login
    form: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 30,
      backgroundColor: '#A82C2E',
      opacity: 0.75,
      borderRadius: 10,
      alignItems: 'center',
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 16,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#000',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
      marginVertical: 10,
    },
    registerButton: {
      backgroundColor: '#000',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    forgotPassword: {
      color: '#000',
      textDecorationLine: 'underline',
      marginTop: 10,
    },
  });
  