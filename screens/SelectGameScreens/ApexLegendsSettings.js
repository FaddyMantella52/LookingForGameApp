import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from "../../assets/BackGroundImage.png";

const ApexSettings = () => {
  const [region, setRegion] = useState('');
  const [rank, setRank] = useState('');
  const [mainLanguage, setMainLanguage] = useState('');
  const [secondaryLanguage, setSecondaryLanguage] = useState('');
  const [mainRole, setMainRole] = useState('');
  const [secondaryRole, setSecondaryRole] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false); // To check if settings have been submitted

  const firestore = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  // Check if user has already submitted settings
  useEffect(() => {
    const checkIfSettingsExist = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const apexSettingsRef = doc(firestore, 'apexSettings', userId);
        const docSnap = await getDoc(apexSettingsRef);

        if (docSnap.exists()) {
          setHasSubmitted(true); // User has already submitted settings
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

    if (!region || !rank || !mainLanguage || !mainRole) {
      alert('Please fill out all required fields.');
      return;
    }

    const apexSettingsRef = doc(firestore, 'apexSettings', userId);
    const data = {
      region,
      rank,
      mainLanguage,
      secondaryLanguage,
      mainRole,
      secondaryRole,
    };

    try {
      // Save user preferences to Firestore
      await setDoc(apexSettingsRef, data, { merge: true });
      console.log('Settings saved successfully.');

      // Navigate to RecommendationApex and pass user settings
      navigation.navigate('RecommendationApex', {
        userSettings: { region, rank, mainLanguage, secondaryLanguage, mainRole, secondaryRole },
      });
    } catch (error) {
      console.error('Error saving Apex Legends settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const skipSettings = () => {
    // Navigate to RecommendationApex without saving settings
    navigation.navigate('RecommendationApex', { userSettings: {} });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Apex Legends Settings</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Region</Text>
              <Picker selectedValue={region} onValueChange={(value) => setRegion(value)} style={styles.picker}>
                <Picker.Item label="Select Region" value="" />
                <Picker.Item label="North America" value="NA" />
                <Picker.Item label="Europe" value="EU" />
                <Picker.Item label="Asia" value="AS" />
                <Picker.Item label="Oceania" value="OC" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Rank</Text>
              <Picker selectedValue={rank} onValueChange={(value) => setRank(value)} style={styles.picker}>
                <Picker.Item label="Select Rank" value="" />
                <Picker.Item label="Bronze" value="Bronze" />
                <Picker.Item label="Silver" value="Silver" />
                <Picker.Item label="Gold" value="Gold" />
                <Picker.Item label="Platinum" value="Platinum" />
                <Picker.Item label="Diamond" value="Diamond" />
                <Picker.Item label="Master" value="Master" />
                <Picker.Item label="Apex Predator" value="Predator" />
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
                <Picker.Item label="Japanese" value="Japanese" />
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
                <Picker.Item label="Japanese" value="Japanese" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Main Role</Text>
              <Picker selectedValue={mainRole} onValueChange={(value) => setMainRole(value)} style={styles.picker}>
                <Picker.Item label="Select Main Role" value="" />
                <Picker.Item label="Assault" value="Assault" />
                <Picker.Item label="Support" value="Support" />
                <Picker.Item label="Recon" value="Recon" />
                <Picker.Item label="Tank" value="Tank" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Secondary Role</Text>
              <Picker selectedValue={secondaryRole} onValueChange={(value) => setSecondaryRole(value)} style={styles.picker}>
                <Picker.Item label="Select Secondary Role" value="" />
                <Picker.Item label="Assault" value="Assault" />
                <Picker.Item label="Support" value="Support" />
                <Picker.Item label="Recon" value="Recon" />
                <Picker.Item label="Tank" value="Tank" />
              </Picker>
            </View>
          </ScrollView>

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

  scrollContainer: {
    paddingBottom: 20,
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
    marginBottom: 20,
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

export default ApexSettings;
