// ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { sendPasswordResetEmail } from "firebase/auth";  // Import function from Firebase
import { auth } from '../firebase';  // Import auth from firebase.js
import backgroundImage from "../assets/BackGroundImage.png";
import styles from './ForgotPasswordScreen.module.js';

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
      source={backgroundImage} 
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