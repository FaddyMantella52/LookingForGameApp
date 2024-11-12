import React, { useState } from 'react';
import { View, Text, Button, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Ensure you install expo-image-picker
import { useNavigation } from '@react-navigation/native';
import defaultImage from '../../assets/defaultProfile.jpg';
import backgroundImage from "../../assets/BackGroundImage.png";

export default function SetUpUsernameScreen({ navigation }){
    const [profileImage, setProfileImage] = useState('');
    //const auth = getAuth();
    
    const pickImage = async () => {
      // Request permission to access media library
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access gallery is required!");
        return;
      }
  
      // Open image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setProfileImage(result.uri); // Store image URI
      }
    };
  
    const handleSkip = () => {
      // Set default image if the user skips
      const defaultImageSkip = {defaultImage}; 
      setProfileImage(defaultImageSkip);
      navigation.navigate("LinkAccountsScreen"); // Navigate to the next screen
    };
  
    const handleNext = () => {
      // Navigate to the LinkAccountsScreen after setting image
      navigation.navigate("LinkAccountsScreen");
    };

    return (
      <ImageBackground 
      source={backgroundImage} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Profile Picture</Text>
        
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.placeholderText}>No profile picture selected</Text>
        )}
  
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={profileImage ? handleNext : handleSkip} style={styles.button}>
          <Text style={styles.buttonText}>{profileImage ? "Next" : "Skip"}</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }


const styles = StyleSheet.create({
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