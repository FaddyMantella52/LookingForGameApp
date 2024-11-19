import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from "@react-native-masked-view/masked-view";
import { auth } from '../firebase';  // Import auth from firebase.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"; 
import titleImage from "../assets/TitleWithNeonEffect.png"; 
import backgroundImage from "../assets/BackGroundImage.png";
import { StatusBar } from 'expo-status-bar';
import styles from './LogInScreen.module.js';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Oops!", "Please fill in all fields.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Success", "Welcome back!");
        navigation.navigate("SetUpProfilePicture");
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage;

        switch (errorCode) {
          case 'auth/wrong-password':
            errorMessage = "Oops! The password you entered is incorrect.";
            break;
          case 'auth/user-not-found':
            errorMessage = "No user found with this email. Please check again.";
            break;
          case 'auth/invalid-email':
            errorMessage = "The email address is badly formatted.";
            break;
          default:
            errorMessage = "Something went wrong. Please try again.";
            break;
        }

        Alert.alert("Error", errorMessage);
      });
  };

  //era un handle register pus degeaba

  const GradientText = (props) => {
    return (
      <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient
          colors={["#F79308", "#F2FFFC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text {...props} style={[props.style, { opacity: 0 }]} />
        </LinearGradient>
      </MaskedView>
    );
  };

  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.background}
    >
    
      <View style={styles.container}>
        <Image 
          source={titleImage} 
          style={styles.titleImage} 
        />
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
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          <StatusBar style="light" /> 
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")} style={styles.registerButton}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")} style={styles.forgotPassword}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        </View>
     </ImageBackground>
  );
}
//Linia 125 este pentru a face icon urile din bara de sus la telefon albe
//Linia 129. Am schimbat de la register screen la set up udername screen ca sa pot lucra mai usor