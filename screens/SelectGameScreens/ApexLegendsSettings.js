import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
      await setDoc(apexSettingsRef, data, { merge: true });
      alert('Apex Legends settings saved successfully!');
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error saving Apex Legends settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const skipSettings = () => {
    navigation.navigate('Main');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Apex Legends Settings</Text>

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
            <Picker.Item label="Bronze" value="Bronze" />
            <Picker.Item label="Silver" value="Silver" />
            <Picker.Item label="Gold" value="Gold" />
            <Picker.Item label="Platinum" value="Platinum" />
            <Picker.Item label="Diamond" value="Diamond" />
            <Picker.Item label="Master" value="Master" />
            <Picker.Item label="Apex Predator" value="Apex Predator" />
          </Picker>
        </View>

        {/* Main Legend Picker */}
        <Text style={styles.label}>Main Legend</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={mainLegend} onValueChange={(value) => setMainLegend(value)} style={styles.picker}>
            <Picker.Item label="Select Main Legend" value="" />
            <Picker.Item label="Wraith" value="Wraith" />
            <Picker.Item label="Gibraltar" value="Gibraltar" />
            <Picker.Item label="Bloodhound" value="Bloodhound" />
            <Picker.Item label="Octane" value="Octane" />
          </Picker>
        </View>

        {/* Secondary Legend Picker */}
        <Text style={styles.label}>Secondary Legend</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={secondaryLegend} onValueChange={(value) => setSecondaryLegend(value)} style={styles.picker}>
            <Picker.Item label="Select Secondary Legend" value="" />
            <Picker.Item label="Lifeline" value="Lifeline" />
            <Picker.Item label="Caustic" value="Caustic" />
            <Picker.Item label="Mirage" value="Mirage" />
            <Picker.Item label="Crypto" value="Crypto" />
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

        {/* Favorite Weapon Picker */}
        <Text style={styles.label}>Favorite Weapon</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={favoriteWeapon} onValueChange={(value) => setFavoriteWeapon(value)} style={styles.picker}>
            <Picker.Item label="Select Favorite Weapon" value="" />
            <Picker.Item label="R-301" value="R-301" />
            <Picker.Item label="Mastiff" value="Mastiff" />
            <Picker.Item label="Peacekeeper" value="Peacekeeper" />
            <Picker.Item label="Devotion" value="Devotion" />
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

export default ApexLegendsSettings;
