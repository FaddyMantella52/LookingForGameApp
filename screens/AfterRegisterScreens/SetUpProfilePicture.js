import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, listAll, getDownloadURL } from "firebase/storage"; // Firebase Storage methods
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore Database methods
import { auth, storage, db } from '../../firebase'; // Firebase instances (ensure firestore is initialized)
import backgroundImage from "../../assets/BackGroundImage.png"; // Background image path
import styles from './SetUpProfilePicture.module'; // Import your styles

export default function SetUpProfilePictureScreen() {
  const [availableImages, setAvailableImages] = useState([]); // Stores Firebase image URLs
  const [selectedImage, setSelectedImage] = useState(''); 
  const navigation = useNavigation();

  // Fetch images from Firebase Storage
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const listRef = ref(storage, 'profilePictures/');
        const res = await listAll(listRef);
        const urls = await Promise.all(res.items.map((itemRef) => getDownloadURL(itemRef)));
        setAvailableImages(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
        Alert.alert("Error", error.message); // Display the actual error message
      }
    };

    fetchImages();
  }, []);

  const handleNext = async () => {
    if (!selectedImage) {
      Alert.alert("No Selection", "Please select a profile picture or skip.");
      return;
    }

    try {
      const userId = auth.currentUser?.uid; // Get the current user's ID
      if (!userId) {
        Alert.alert("Error", "User is not authenticated.");
        return;
      }
      
      // Fetch the username from Firestore (if already exists)
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      let username = "";

    // If the document exists and contains a 'username' field, use that
    if (userDoc.exists()) {
      username = userDoc.data().username || "";
    }

    // If 'username' is still empty, fallback to 'displayName' or email
    if (!username) {
      username = auth.currentUser?.displayName || auth.currentUser?.email.split('@')[0];
    }

    const email = auth.currentUser?.email; // Get email from the authenticated user

      // Save the profile picture and other user details to Firestore
      await setDoc(userDocRef, {
        profilePicture: selectedImage,
        email: email,
        username: username
      }, { merge: true }); // Merging to avoid overwriting existing data

      navigation.navigate("Main");
    } catch (error) {
      console.error("Error saving profile picture:", error);
      Alert.alert("Error", "Could not save the profile picture. Please try again.");
    }
  };

  const handleSkip = () => {
    navigation.navigate("Main");
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Profile Picture</Text>

        <ScrollView contentContainerStyle={styles.imageGrid}>
          {availableImages.length > 0 ? (
            availableImages.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(item)}
                style={[
                  styles.imageContainer,
                  selectedImage === item && styles.selectedImageContainer, // Highlight selected image
                ]}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item }} style={styles.imageThumbnail} />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.placeholderText}>No images available</Text>
          )}
        </ScrollView>

        <TouchableOpacity
          onPress={handleNext}
          style={[styles.button, selectedImage ? styles.buttonEnabled : styles.buttonDisabled]}
          disabled={!selectedImage}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip} style={styles.button}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
