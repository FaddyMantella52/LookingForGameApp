import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet,} from 'react-native';
import { doc, updateDoc } from 'firebase/firestore'; // Firestore methods
import { getAuth } from 'firebase/auth'; // Firebase Auth
import { db } from '../firebase'; // Firestore instance
import { updatePassword } from 'firebase/auth';
import backgroundImage from "../assets/BackGroundImage.png";
import styles from './ScreenModules/EditProfileScreen.module.js'; // Use a modular stylesheet
import SetUpProfilePictureScreen from './AfterRegisterScreens/SetUpProfilePicture';

export default function EditProfile({ route, navigation }) {
  const { userData } = route.params; // Passed from ProfileScreen
  const [username, setUsername] = useState(userData.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'You must be logged in to update your profile.');
      return;
    }

    const userId = user.uid;

    try {
      if (newPassword && newPassword !== confirmPassword) {
        Alert.alert('Error', "New password and confirm password don't match.");
        return;
      }

      // Update Firestore document
      const updatedFields = { username };
      const userDocRef = doc(db, 'users', userId);

      await updateDoc(userDocRef, updatedFields);

      // Update password in Firebase Auth (if provided)
      if (newPassword) {
        await updatePassword(user, newPassword); // Firebase auth handles password updates
      }

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack(); // Go back to the Profile screen
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background} // Style for the background
    >
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter new username"
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter new password"
          secureTextEntry
        />

        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
          secureTextEntry
        />

        <TouchableOpacity style={styles.changePictureButton} onPress={() => navigation.navigate("SetUpProfilePicture")}>
          <Text style={styles.saveButtonText}>Change Profile Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
