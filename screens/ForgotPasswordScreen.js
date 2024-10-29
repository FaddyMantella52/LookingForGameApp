// ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { sendPasswordResetEmail } from "firebase/auth";  // Import function from Firebase
import { auth } from '../firebase';  // Import auth from firebase.js

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Success", "Password reset email sent successfully!");
        navigation.goBack();  // Return to the previous screen
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://cdn.discordapp.com/attachments/721734208984187022/1298216695235612732/pngtree-background-of-monitor-computer-with-online-game-streaming-desktop-image_15734081.png?ex=672153c3&is=67200243&hm=a9a0fbb2293e700e93f98f7b4afdb76910a52cb046390dd202de02cbc5af65e4&' }}  // Background image URL
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
            <Text style={styles.buttonText}>Send Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Optional dark overlay for better contrast
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffffcc', // Slightly transparent white background
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
