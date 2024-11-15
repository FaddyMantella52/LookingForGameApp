import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"; 
import { auth } from '../firebase';  // Import your Firebase auth instance
import backgroundImage from "../assets/BackGroundImage.png";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password

  const handleRegister = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // Send email verification
        sendEmailVerification(user)
          .then(() => {
            Alert.alert("Success", "Registered successfully! Please check your email for verification.");
            navigation.navigate("SetUpProfilePicture");
          })
          .catch((error) => {
            Alert.alert("Error", error.message);
          });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background} // Style for the background
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
  },
  inputContainer: {
    backgroundColor: '#A82C2E',
    opacity: 0.75,
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400, // Optional: Max width for better layout on larger screens
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
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
  link: {
    color: '#000',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
