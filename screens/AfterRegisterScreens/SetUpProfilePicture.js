import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, listAll, getDownloadURL } from "firebase/storage"; // Firebase Storage methods
import { storage } from '../../firebase'; // Firebase Storage instance
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
        console.log("Fetching images from Firebase Storage...");
        const listRef = ref(storage, 'profilePictures/');
        console.log("List reference created:", listRef);

        const res = await listAll(listRef);
        console.log("List result:", res);

        const urls = await Promise.all(
          res.items.map((itemRef) => {
            console.log("Getting URL for:", itemRef.fullPath);
            return getDownloadURL(itemRef);
          })
        );

        setAvailableImages(urls);
        console.log("Fetched URLs:", urls);
      } catch (error) {
        console.error("Error fetching images:", error);
        Alert.alert("Error", error.message); // Display the actual error message
      }
    };

    fetchImages();
  }, []);

  const handleNext = () => {
    if (!selectedImage) {
      Alert.alert("No Selection", "Please select a profile picture or skip.");
      return;
    }

    navigation.navigate("LinkAccountsScreen", { profilePicture: selectedImage });
  };

  const handleSkip = () => {
    navigation.navigate("LinkAccountsScreen", { profilePicture: null }); // Or use a default image
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