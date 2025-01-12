import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from "../../assets/BackGroundImage.png";

const CSGOSettings = () => {
  const [region, setRegion] = useState('');
  const [rank, setRank] = useState('');
  const [mainRole, setMainRole] = useState('');
  const [mainLanguage, setMainLanguage] = useState('');
  const [secondaryLanguage, setSecondaryLanguage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const firestore = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const checkIfSettingsExist = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const csgoSettingsRef = doc(firestore, 'csgoSettings', userId);
        const docSnap = await getDoc(csgoSettingsRef);

        if (docSnap.exists()) {
          setHasSubmitted(true);
        }
      }
    };

    checkIfSettingsExist();
  }, []);

  const saveSettings = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert('You must be logged in to save settings.');
      return;
    }

    if (!region || !rank || !mainRole) {
      alert('Please fill out all required fields.');
      return;
    }

    const csgoSettingsRef = doc(firestore, 'csgoSettings', userId);
    const data = {
      region,
      rank,
      mainRole,
    };

    try {
      await setDoc(csgoSettingsRef, data, { merge: true });
      console.log('Settings saved successfully.');
      navigation.navigate('RecommendationCSGO', {
        userSettings: { region, rank, mainRole },
      });
    } catch (error) {
      console.error('Error saving CS:GO settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const skipSettings = () => {
    navigation.navigate('RecommendationCSGO', { userSettings: {} });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>CS:GO Settings</Text>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Region</Text>
          <Picker selectedValue={region} onValueChange={(value) => setRegion(value)} style={styles.picker}>
            <Picker.Item label="Select Region" value="" />
            <Picker.Item label="North America" value="NA" />
            <Picker.Item label="Europe" value="EU" />
            <Picker.Item label="Asia" value="Asia" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Rank</Text>
          <Picker selectedValue={rank} onValueChange={(value) => setRank(value)} style={styles.picker}>
            <Picker.Item label="Select Rank" value="" />
            <Picker.Item label="Silver" value="Silver" />
            <Picker.Item label="Gold Nova" value="Gold Nova" />
            <Picker.Item label="Master Guardian" value="Master Guardian" />
            <Picker.Item label="Legendary" value="Legendary" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Main Role</Text>
          <Picker selectedValue={mainRole} onValueChange={(value) => setMainRole(value)} style={styles.picker}>
            <Picker.Item label="Select Main Role" value="" />
            <Picker.Item label="AWPer" value="AWPer" />
            <Picker.Item label="Entry Fragger" value="Entry Fragger" />
            <Picker.Item label="Support" value="Support" />
            <Picker.Item label="Rifler" value="Rifler" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Main Language</Text>
                  <Picker selectedValue={mainLanguage} onValueChange={(value) => setMainLanguage(value)} style={styles.picker}>
                    <Picker.Item label="Select Main Language" value="" />
                    <Picker.Item label="English" value="English" />
                    <Picker.Item label="Spanish" value="Spanish" />
                    <Picker.Item label="French" value="French" />
                    <Picker.Item label="German" value="German" />
                    <Picker.Item label="Korean" value="Korean" />
                  </Picker>
                </View>
        
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Secondary Language</Text>
                  <Picker selectedValue={secondaryLanguage} onValueChange={(value) => setSecondaryLanguage(value)} style={styles.picker}>
                    <Picker.Item label="Select Secondary Language" value="" />
                    <Picker.Item label="English" value="English" />
                    <Picker.Item label="Spanish" value="Spanish" />
                    <Picker.Item label="French" value="French" />
                    <Picker.Item label="German" value="German" />
                    <Picker.Item label="Korean" value="Korean" />
                  </Picker>
                </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          {hasSubmitted && (
            <TouchableOpacity style={styles.skipButton} onPress={skipSettings}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    opacity: 0.85,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
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
    opacity: 0.85,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  skipButton: {
    backgroundColor: '#FF6347',
    opacity: 0.85,
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

export default CSGOSettings;
