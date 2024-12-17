import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from "../../assets/BackGroundImage.png";

const Dota2Settings = () => {
  const [region, setRegion] = useState('');
  const [rank, setRank] = useState('');
  const [mainHero, setMainHero] = useState('');
  const [secondaryHero, setSecondaryHero] = useState('');
  const [playStyle, setPlayStyle] = useState('');
  const [favoriteRole, setFavoriteRole] = useState('');

  const firestore = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  const saveSettings = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert('You must be logged in to save settings.');
      return;
    }

    const dotaSettingsRef = doc(firestore, 'dotaSettings', userId);

    // Construct the data object with only non-empty fields
    const data = {};
    if (region) data.region = region;
    if (rank) data.rank = rank;
    if (mainHero) data.mainHero = mainHero;
    if (secondaryHero) data.secondaryHero = secondaryHero;
    if (playStyle) data.playStyle = playStyle;
    if (favoriteRole) data.favoriteRole = favoriteRole;

    if (Object.keys(data).length === 0) {
      alert('No fields to update. Please fill in at least one field.');
      return;
    }

    try {
      await setDoc(dotaSettingsRef, data, { merge: true }); // Merge to update specific fields
      alert('Dota 2 settings saved successfully!');
      navigation.navigate('Main'); // Navigate to Home screen
    } catch (error) {
      console.error('Error saving Dota 2 settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Dota 2 Settings</Text>

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
          placeholder="Main Hero"
          placeholderTextColor="#aaa"
          value={mainHero}
          onChangeText={setMainHero}
        />
        <TextInput
          style={styles.input}
          placeholder="Secondary Hero"
          placeholderTextColor="#aaa"
          value={secondaryHero}
          onChangeText={setSecondaryHero}
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
          placeholder="Favorite Role"
          placeholderTextColor="#aaa"
          value={favoriteRole}
          onChangeText={setFavoriteRole}
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

export default Dota2Settings;
