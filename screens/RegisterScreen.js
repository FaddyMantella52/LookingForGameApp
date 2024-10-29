import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth } from '../firebase';  // Import your Firebase auth instance

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
        Alert.alert("Success", "Registered successfully!");
        navigation.navigate("LogInScreen");  
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://cdn.discordapp.com/attachments/721734208984187022/1298216695235612732/pngtree-background-of-monitor-computer-with-online-game-streaming-desktop-image_15734081.png?ex=672153c3&is=67200243&hm=a9a0fbb2293e700e93f98f7b4afdb76910a52cb046390dd202de02cbc5af65e4&' }} // Replace with your background image URL
      style={styles.background} // Style for the background
    >
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
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
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("LogInScreen")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with transparency
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400, // Optional: Max width for better layout on larger screens
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#fff', // Adjust text color for visibility against the background
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
    color: '#fff', // Adjust text color for visibility
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
