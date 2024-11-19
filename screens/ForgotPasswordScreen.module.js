import { StyleSheet } from "react-native";

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
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
    },
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
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    successContainer: {           //pentru mesaju care apare dupa ce trimiti mail ul
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 30,
      backgroundColor: '#A82C2E',
      opacity: 0.75,
      borderRadius: 10,
      alignItems: 'center',
    },
    successMessage: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 10,
      textAlign: 'center',
    },
    subMessage: {
      fontSize: 16,
      color: '#000',
      marginBottom: 20,
      textAlign: 'center',
    },
  });
  