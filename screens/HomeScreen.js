import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import styles from './HomeScreen.module.js';

const HomeScreen = ({ navigation }) => {
    const handleLogout = () => {
        // Optionally add a confirmation alert before navigating away
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Log Out",
                    onPress: () => navigation.navigate("LogInScreen") // Navigate to Login screen
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;