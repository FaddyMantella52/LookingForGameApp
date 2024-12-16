import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from "../../assets/BackGroundImage.png";

const CS_GOSettings = () => {
  const [region, setRegion] = useState('');
  const [rank, setRank] = useState('');
  const [mainLanguage, setMainLanguage] = useState('');
  const [secondaryLanguage, setSecondaryLanguage] = useState('');
  const [favoriteMap, setFavoriteMap] = useState('');
  const [playStyle, setPlayStyle] = useState('');
  const [favoriteWeapon, setFavoriteWeapon] = useState(''); // New Field

  const firestore = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  const saveSettings = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert('You must be logged in to save settings.');
      return;
    }

    const csgoSettingsRef = doc(firestore, 'csgoSettings', userId);

    // Construct the data object with only non-empty fields
    const data = {};
    if (region) data.region = region;
    if (rank) data.rank = rank;
    if (mainLanguage) data.mainLanguage = mainLanguage;
    if (secondaryLanguage) data.secondaryLanguage = secondaryLanguage;
    if (favoriteMap) data.favoriteMap = favoriteMap;
    if (playStyle) data.playStyle = playStyle;
    if (favoriteWeapon) data.favoriteWeapon = favoriteWeapon;

    if (Object.keys(data).length === 0) {
      alert('No fields to update. Please fill in at least one field.');
      return;
    }

    try {
      await setDoc(csgoSettingsRef, data, { merge: true }); // Merge to update specific fields
      alert('CS:GO settings saved successfully!');
      navigation.navigate('Main'); // Navigate to Home screen
    } catch (error) {
      console.error('Error saving CS:GO settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>CS:GO Settings</Text>

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
          placeholder="Main Language"
          placeholderTextColor="#aaa"
          value={mainLanguage}
          onChangeText={setMainLanguage}
        />
        <TextInput
          style={styles.input}
          placeholder="Secondary Language"
          placeholderTextColor="#aaa"
          value={secondaryLanguage}
          onChangeText={setSecondaryLanguage}
        />
        <TextInput
          style={styles.input}
          placeholder="Favorite Map"
          placeholderTextColor="#aaa"
          value={favoriteMap}
          onChangeText={setFavoriteMap}
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

export default CS_GOSettings;
