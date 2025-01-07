import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
      await setDoc(dotaSettingsRef, data, { merge: true });
      alert('Dota 2 settings saved successfully!');
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error saving Dota 2 settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const skipSettings = () => {
    navigation.navigate('Main');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Dota 2 Settings</Text>

        {/* Region Picker */}
        <Text style={styles.label}>Region</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={region} onValueChange={(value) => setRegion(value)} style={styles.picker}>
            <Picker.Item label="Select Region" value="" />
            <Picker.Item label="North America" value="NA" />
            <Picker.Item label="Europe" value="EU" />
            <Picker.Item label="Asia" value="Asia" />
            <Picker.Item label="Oceania" value="Oceania" />
          </Picker>
        </View>

        {/* Rank Picker */}
        <Text style={styles.label}>Rank</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={rank} onValueChange={(value) => setRank(value)} style={styles.picker}>
            <Picker.Item label="Select Rank" value="" />
            <Picker.Item label="Herald" value="Herald" />
            <Picker.Item label="Guardian" value="Guardian" />
            <Picker.Item label="Crusader" value="Crusader" />
            <Picker.Item label="Archon" value="Archon" />
            <Picker.Item label="Legend" value="Legend" />
            <Picker.Item label="Divine" value="Divine" />
            <Picker.Item label="Immortal" value="Immortal" />
          </Picker>
        </View>

        {/* Main Hero Picker */}
        <Text style={styles.label}>Main Hero</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={mainHero} onValueChange={(value) => setMainHero(value)} style={styles.picker}>
            <Picker.Item label="Select Main Hero" value="" />
            <Picker.Item label="Anti-Mage" value="Anti-Mage" />
            <Picker.Item label="Axe" value="Axe" />
            <Picker.Item label="Pudge" value="Pudge" />
            <Picker.Item label="Invoker" value="Invoker" />
          </Picker>
        </View>

        {/* Secondary Hero Picker */}
        <Text style={styles.label}>Secondary Hero</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={secondaryHero} onValueChange={(value) => setSecondaryHero(value)} style={styles.picker}>
            <Picker.Item label="Select Secondary Hero" value="" />
            <Picker.Item label="Lina" value="Lina" />
            <Picker.Item label="Tinker" value="Tinker" />
            <Picker.Item label="Drow Ranger" value="Drow Ranger" />
            <Picker.Item label="Zeus" value="Zeus" />
          </Picker>
        </View>

        {/* Play Style Picker */}
        <Text style={styles.label}>Play Style</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={playStyle} onValueChange={(value) => setPlayStyle(value)} style={styles.picker}>
            <Picker.Item label="Select Play Style" value="" />
            <Picker.Item label="Aggressive" value="Aggressive" />
            <Picker.Item label="Defensive" value="Defensive" />
            <Picker.Item label="Support" value="Support" />
          </Picker>
        </View>

        {/* Favorite Role Picker */}
        <Text style={styles.label}>Favorite Role</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={favoriteRole} onValueChange={(value) => setFavoriteRole(value)} style={styles.picker}>
            <Picker.Item label="Select Favorite Role" value="" />
            <Picker.Item label="Carry" value="Carry" />
            <Picker.Item label="Support" value="Support" />
            <Picker.Item label="Offlane" value="Offlane" />
            <Picker.Item label="Midlane" value="Midlane" />
          </Picker>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={skipSettings}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  pickerContainer: {
    marginBottom: 15,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
  },
  picker: {
    color: '#fff',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  skipButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Dota2Settings;
