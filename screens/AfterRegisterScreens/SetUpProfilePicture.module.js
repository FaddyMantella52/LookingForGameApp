import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 20,
    },
    placeholderText: {
      fontSize: 16,
      color: '#888',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#000',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
      width: '60%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });