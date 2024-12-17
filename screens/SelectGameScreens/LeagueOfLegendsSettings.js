import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from "../../assets/BackGroundImage.png";

const LeagueOfLegendsSettings = () => {
  const [region, setRegion] = useState('');
  const [rank, setRank] = useState('');
  const [mainLanguage, setMainLanguage] = useState('');
  const [secondaryLanguage, setSecondaryLanguage] = useState('');
  const [mainRole, setMainRole] = useState('');
  const [secondaryRole, setSecondaryRole] = useState('');

  const firestore = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  const saveSettings = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert('You must be logged in to save settings.');
      return;
    }

    const leagueSettingsRef = doc(firestore, 'leagueSettings', userId);
    const data = { region, rank, mainLanguage, secondaryLanguage, mainRole, secondaryRole };

    try {
      await setDoc(leagueSettingsRef, data, { merge: true });
      alert('League of Legends settings saved successfully!');
      navigation.navigate('Main'); // Navigate to Home screen
    } catch (error) {
      console.error('Error saving League of Legends settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>League of Legends Settings</Text>

        {/* Region Picker */}
        <Text style={styles.label}>Region</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={region} onValueChange={(value) => setRegion(value)} style={styles.picker}>
            <Picker.Item label="Select Region" value="" />
            <Picker.Item label="North America" value="NA" />
            <Picker.Item label="Europe West" value="EUW" />
            <Picker.Item label="Europe Nordic & East" value="EUNE" />
            <Picker.Item label="Korea" value="KR" />
            <Picker.Item label="Brazil" value="BR" />
          </Picker>
        </View>

        {/* Rank Picker */}
        <Text style={styles.label}>Rank</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={rank} onValueChange={(value) => setRank(value)} style={styles.picker}>
            <Picker.Item label="Select Rank" value="" />
            <Picker.Item label="Iron" value="Iron" />
            <Picker.Item label="Bronze" value="Bronze" />
            <Picker.Item label="Silver" value="Silver" />
            <Picker.Item label="Gold" value="Gold" />
            <Picker.Item label="Platinum" value="Platinum" />
            <Picker.Item label="Diamond" value="Diamond" />
            <Picker.Item label="Master" value="Master" />
            <Picker.Item label="Grandmaster" value="Grandmaster" />
            <Picker.Item label="Challenger" value="Challenger" />
          </Picker>
        </View>

        {/* Main Language Picker */}
        <Text style={styles.label}>Main Language</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={mainLanguage} onValueChange={(value) => setMainLanguage(value)} style={styles.picker}>
            <Picker.Item label="Select Main Language" value="" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="French" value="French" />
            <Picker.Item label="German" value="German" />
            <Picker.Item label="Korean" value="Korean" />
          </Picker>
        </View>

        {/* Secondary Language Picker */}
        <Text style={styles.label}>Secondary Language</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={secondaryLanguage} onValueChange={(value) => setSecondaryLanguage(value)} style={styles.picker}>
            <Picker.Item label="Select Secondary Language" value="" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="French" value="French" />
            <Picker.Item label="German" value="German" />
            <Picker.Item label="Korean" value="Korean" />
          </Picker>
        </View>

        {/* Main Role Picker */}
        <Text style={styles.label}>Main Role</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={mainRole} onValueChange={(value) => setMainRole(value)} style={styles.picker}>
            <Picker.Item label="Select Main Role" value="" />
            <Picker.Item label="Top" value="Top" />
            <Picker.Item label="Jungle" value="Jungle" />
            <Picker.Item label="Mid" value="Mid" />
            <Picker.Item label="ADC" value="ADC" />
            <Picker.Item label="Support" value="Support" />
          </Picker>
        </View>

        {/* Secondary Role Picker */}
        <Text style={styles.label}>Secondary Role</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={secondaryRole} onValueChange={(value) => setSecondaryRole(value)} style={styles.picker}>
            <Picker.Item label="Select Secondary Role" value="" />
            <Picker.Item label="Top" value="Top" />
            <Picker.Item label="Jungle" value="Jungle" />
            <Picker.Item label="Mid" value="Mid" />
            <Picker.Item label="ADC" value="ADC" />
            <Picker.Item label="Support" value="Support" />
          </Picker>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { padding: 20 },
  title: { fontSize: 22, color: '#fff', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, color: '#fff', marginBottom: 5 },
  pickerContainer: { backgroundColor: '#1c1c1c', borderRadius: 8, marginBottom: 15 },
  picker: { color: '#fff' },
  saveButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default LeagueOfLegendsSettings;
