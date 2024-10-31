// ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { sendPasswordResetEmail } from "firebase/auth";  // Import function from Firebase
import { auth } from '../firebase';  // Import auth from firebase.js
import backgroundImage from "../assets/BackGroundImage.png";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <ImageBackground 
      source={backgroundImage}  // Background image URL
      style={styles.background}
      >
        <View style={styles.container}>
          {emailSent ? (
            // Success Message Screen
            <View style={styles.successContainer}>
              <Text style={styles.successMessage}>Email Sent Successfully!</Text>
              <Text style={styles.subMessage}>Didn’t receive anything?</Text>
              <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
                <Text style={styles.buttonText}>Send Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Email Input Screen
            <View style={styles.form}>
              <Text style={styles.title}>Forgot Password</Text>
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
          )}
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
    backgroundColor: '#A82C2E',
    opacity: 0.75,
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
  successContainer: {           //pentru mesaju care apare dupa ce trimiti mail ul
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#A82C2E',
    opacity: 0.75,
    borderRadius: 10,
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
});
