import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"; 
import { collection, setDoc, doc } from "firebase/firestore"; 
import { auth, db } from '../firebase';  
import backgroundImage from "../assets/BackGroundImage.png";
import styles from "./ScreenModules/RegisterScreen.module";


export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

        // Add user data to Firestore
        await setDoc(doc(db,"users", userId),{
          username: username,
          email: email,
          userId: userId,
        });

      // Send email verification
      await sendEmailVerification(user);

      Alert.alert("Success", "Registered successfully! Please check your email for verification.");
      navigation.navigate("SetUpProfilePicture");

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Register</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LogInScreen")}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
