import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth'; // Firebase Auth
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods
import { db } from '../firebase'; // Firestore instance
import styles from './ScreenModules/ProfileScreen.module.js';
import backgroundImage from "../assets/BackGroundImage.png";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth(); // Get Firebase Auth instance
        const user = auth.currentUser; // Get the currently logged-in user

        if (user) {
          const userId = user.uid; // Get the user's unique ID (uid)
          console.log('Logged in userId:', userId);

          // Fetch the user document from Firestore
          const docRef = doc(db, 'users', userId); // Reference to the user's document
          const docSnap = await getDoc(docRef); // Fetch the document

          if (docSnap.exists()) {
            setUserData(docSnap.data()); // Set the user data from Firestore
          } else {
            console.error('No such document found!');
            Alert.alert('Error', 'User data not found.');
          }
        } else {
          console.error('No user is logged in!');
          Alert.alert('Error', 'You must be logged in to view this screen.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data.');
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background} // Style for the background
    >
    <View style={styles.container}>
      {userData ? (
        <>
          <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
          <Text style={styles.username}>{userData.username}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile', { userData })}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>Failed to load user data.</Text>
      )}
    </View>
    </ImageBackground>
  );
}