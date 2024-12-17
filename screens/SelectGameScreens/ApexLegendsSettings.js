import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from "../../assets/BackGroundImage.png";

const ApexLegendsSettings = () => {
  const [region, setRegion] = useState('');
  const [rank, setRank] = useState('');
  const [mainLegend, setMainLegend] = useState('');
  const [secondaryLegend, setSecondaryLegend] = useState('');
  const [playStyle, setPlayStyle] = useState('');
  const [favoriteWeapon, setFavoriteWeapon] = useState('');

  const firestore = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  const saveSettings = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert('You must be logged in to save settings.');
      return;
    }

    const apexSettingsRef = doc(firestore, 'apexSettings', userId);

    // Construct the data object with only non-empty fields
    const data = {};
    if (region) data.region = region;
    if (rank) data.rank = rank;
    if (mainLegend) data.mainLegend = mainLegend;
    if (secondaryLegend) data.secondaryLegend = secondaryLegend;
    if (playStyle) data.playStyle = playStyle;
    if (favoriteWeapon) data.favoriteWeapon = favoriteWeapon;

    if (Object.keys(data).length === 0) {
      alert('No fields to update. Please fill in at least one field.');
      return;
    }

    try {
      await setDoc(apexSettingsRef, data, { merge: true }); // Merge to update specific fields
      alert('Apex Legends settings saved successfully!');
      navigation.navigate('Main'); // Navigate to Home screen
    } catch (error) {
      console.error('Error saving Apex Legends settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Apex Legends Settings</Text>

        <TextInput
          style={styles.input}
          placeholder="Region"
          placeholderTextColor="#aaa"
          value={region}
          onChangeText={setRegion}
        />
        <TextInput
          style={styles.input}
          placeholder="Rank"
          placeholderTextColor="#aaa"
          value={rank}
          onChangeText={setRank}
        />
        <TextInput
          style={styles.input}
          placeholder="Main Legend"
          placeholderTextColor="#aaa"
          value={mainLegend}
          onChangeText={setMainLegend}
        />
        <TextInput
          style={styles.input}
          placeholder="Secondary Legend"
          placeholderTextColor="#aaa"
          value={secondaryLegend}
          onChangeText={setSecondaryLegend}
        />
        <TextInput
          style={styles.input}
          placeholder="Play Style"
          placeholderTextColor="#aaa"
          value={playStyle}
          onChangeText={setPlayStyle}
        />
        <TextInput
          style={styles.input}
          placeholder="Favorite Weapon"
          placeholderTextColor="#aaa"
          value={favoriteWeapon}
          onChangeText={setFavoriteWeapon}
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Transparent overlay for readability
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ApexLegendsSettings;
