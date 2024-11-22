import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getDocs, query, collection, where, setDoc, doc } from "firebase/firestore";
import { auth, db } from '../firebase';
import backgroundImage from "../assets/BackGroundImage.png";
import styles from "./ScreenModules/RegisterScreen.module";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isUsernameUnique = async (username) => {
    try {
      const usersRef = collection(db, "users");
      const usernameQuery = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);
      return querySnapshot.empty; // Returns true if no documents match the username
    } catch (error) {
      Alert.alert("Error", "Failed to check username uniqueness. Please try again.");
      console.error(error);
      return false;
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const unique = await isUsernameUnique(username);
      if (!unique) {
        Alert.alert("Error", "Username is already taken. Please choose another one.");
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      Alert.alert(
        "Email Verification Required",
        "Registered successfully! Please check your email to verify your account before proceeding."
      );

      // Redirect to VerifyEmailScreen
      navigation.navigate("VerifyEmailScreen", { username, email, uid: user.uid });

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };


  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
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
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LogInScreen")}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
