import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
  const [favoriteWeapon, setFavoriteWeapon] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track submission status

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
      await setDoc(csgoSettingsRef, data, { merge: true });
      alert('CS:GO settings saved successfully!');
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error saving CS:GO settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const skipSettings = () => {
    navigation.navigate('Main');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>CS:GO Settings</Text>

        {/* Region Picker */}
        <Text style={styles.label}>Region</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={region} onValueChange={(value) => setRegion(value)} style={styles.picker}>
          <Picker.Item label="Select Region" value="" />
            <Picker.Item label="Americas" value="NA" />
            <Picker.Item label="Europe" value="EU" />
            <Picker.Item label="Asia-Pacific" value="Asia" />
          </Picker>
        </View>

        {/* Rank Picker */}
        <Text style={styles.label}>Rank</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={rank} onValueChange={(value) => setRank(value)} style={styles.picker}>
            <Picker.Item label="Select Rank" value="" />
            <Picker.Item label="Silver 1-4" value="Silver 1-4" />
            <Picker.Item label="Silver Elite/Master" value="Silver Elite/Master" />
            <Picker.Item label="Gold Nova 1-4" value="Gold Nova 1-4" />
            <Picker.Item label="Gold Nova Master" value="Gold Nova Master" />
            <Picker.Item label="Master Guardian 1-2" value="Master Guardian 1-2" />
            <Picker.Item label="Master Guardian Elite/Distinguised" value="Master Guardian Elite/Distinguised" />
            <Picker.Item label="Legendary Eagle/Master" value="Legendary Eagle/Master" />
            <Picker.Item label="Supreme Master" value="Supreme Master" />
            <Picker.Item label="Global Elite" value="Global Elite" />
          </Picker>
        </View>

        {/* Main Language Picker */}
        <Text style={styles.label}>Main Language</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={mainLanguage} onValueChange={(value) => setMainLanguage(value)} style={styles.picker}>
            <Picker.Item label="Select Main Language" value="" />
            <Picker.Item label="Romanian" value="Romanian" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="French" value="French" />
            <Picker.Item label="German" value="German" />
          </Picker>
        </View>

        {/* Secondary Language Picker */}
        <Text style={styles.label}>Secondary Language</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={secondaryLanguage} onValueChange={(value) => setSecondaryLanguage(value)} style={styles.picker}>
            <Picker.Item label="Select Secondary Language" value="" />
            <Picker.Item label="Romanian" value="Romanian" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="French" value="French" />
            <Picker.Item label="German" value="German" />
          </Picker>
        </View>

        {/* Favorite Map Picker */}
        <Text style={styles.label}>Favorite Map</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={favoriteMap} onValueChange={(value) => setFavoriteMap(value)} style={styles.picker}>
            <Picker.Item label="Select Favorite Map" value="" />
            <Picker.Item label="Dust 2" value="Dust 2" />
            <Picker.Item label="Mirage" value="Mirage" />
            <Picker.Item label="Inferno" value="Inferno" />
            <Picker.Item label="Nuke" value="Nuke" />
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
            <Picker.Item label="AK-47" value="AK-47" />
            <Picker.Item label="M4A4" value="M4A4" />
            <Picker.Item label="AWP" value="AWP" />
            <Picker.Item label="Desert Eagle" value="Desert Eagle" />
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

export default CS_GOSettings;
