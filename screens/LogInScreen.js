import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from "@react-native-masked-view/masked-view";
import { auth } from '../firebase';  // Import auth from firebase.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"; 

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
        navigation.navigate("HomeScreen");
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

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert("Oops!", "Please fill in all fields.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Success", "Registered successfully! Welcome!");
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage;

        switch (errorCode) {
          case 'auth/wrong-password':
            errorMessage = "Oops! The password you entered is incorrect.";
            break;
          case 'auth/invalid-email':
            errorMessage = "The email address format is invalid.";
            break;
          default:
            errorMessage = "Something went wrong. Please try again.";
            break;
        }

        Alert.alert("Error", errorMessage);
      });
  };

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
      source={{ uri: 'https://cdn.discordapp.com/attachments/721734208984187022/1298216695235612732/pngtree-background-of-monitor-computer-with-online-game-streaming-desktop-image_15734081.png?ex=672153c3&is=67200243&hm=a9a0fbb2293e700e93f98f7b4afdb76910a52cb046390dd202de02cbc5af65e4&' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <GradientText style={styles.textStyle}>TeamFinder</GradientText>

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
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")} style={styles.registerButton}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
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
  gradientTextContainer: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 30,
  },
  textStyle: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Jaro', // Add the Jaro font family
    marginTop: 20, 
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'transparent', // Hide the original text color
    backgroundClip: 'text', // Not directly available in RN, but setting color to transparent helps
    backgroundColor: 'transparent',
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
  registerButton: {
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
  forgotPassword: {
    color: '#000',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
