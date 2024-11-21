import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Alert, Image, ScrollView } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import styles from "./LinkAccountsScreen.module";
import riotIcon from "../../assets/riot-icon.png"; // Riot Games icon
import steamIcon from "../../assets/steam-icon.png"; // Steam icon
import eaIcon from "../../assets/ea-icon.png"; // EA icon
import backgroundImage from "../../assets/BackGroundImage.png"; // Background image path

const LinkAccountsScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser; // Get the currently logged-in user

  const handleLogout = () => {
    // Confirmation alert before logging out
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          onPress: async () => {
            try {
              await signOut(auth); // Sign out the user
              navigation.navigate("LogInScreen"); // Navigate to Login screen
            } catch (error) {
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          },
        },
      ]
    );
  };

  const handleSkip = () => {
    // Navigate back to the home screen without linking any account
    navigation.navigate("HomeScreen");
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Link Your Game Accounts</Text>

        {/* Riot Games Icon */}
        <Image source={riotIcon} style={styles.accountIcon} />
        <Text style={styles.subtitle}>Link your Riot Games account to proceed</Text>
        <TouchableOpacity style={styles.button} onPress={() => {/* Implement linking logic here */}}>
          <Text style={styles.buttonText}>Link Riot Account</Text>
        </TouchableOpacity>

        {/* Steam Icon */}
        <Image source={steamIcon} style={styles.accountIcon} />
        <Text style={styles.subtitle}>Link your Steam account to proceed</Text>
        <TouchableOpacity style={styles.button} onPress={() => {/* Implement linking logic here */}}>
          <Text style={styles.buttonText}>Link Steam Account</Text>
        </TouchableOpacity>

        {/* EA Icon */}
        <Image source={eaIcon} style={styles.accountIcon} />
        <Text style={styles.subtitle}>Link your EA account to proceed</Text>
        <TouchableOpacity style={styles.button} onPress={() => {/* Implement linking logic here */}}>
          <Text style={styles.buttonText}>Link EA Account</Text>
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>

        {/* Optional logout button */}
        {currentUser && (
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default LinkAccountsScreen;
