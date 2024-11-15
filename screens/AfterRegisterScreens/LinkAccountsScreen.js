import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import styles from './LinkAccountsScreen.module';

const HomeScreen = ({ navigation }) => {
    const auth = getAuth();
    user = Firebase.auth.currentUser
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
            <user style={styles.title}></user>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out A</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;