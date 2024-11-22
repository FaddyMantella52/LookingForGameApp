import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from '../firebase';
import styles from "./ScreenModules/VerifyEmailScreen.module";

export default function VerifyEmailScreen({ route, navigation }) {
  const { username, email, uid } = route.params;

  const handleResendVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
      Alert.alert("Verification Sent", "A new verification email has been sent to your email address.");
    }
  };

  const handleCheckVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      if (user.emailVerified) {
        // Store user data in Firestore after verification
        await setDoc(doc(db, "users", uid), { username, email, userId: uid });

        Alert.alert("Success", "Email verified! You can now continue.");
        navigation.navigate("SetUpProfilePicture");
      } else {
        Alert.alert("Not Verified", "Your email is not verified yet. Please check your inbox.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please verify your email before continuing.</Text>
      <TouchableOpacity onPress={handleResendVerification} style={styles.button}>
        <Text style={styles.buttonText}>Resend Verification Email</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCheckVerification} style={styles.button}>
        <Text style={styles.buttonText}>Check Verification Status</Text>
      </TouchableOpacity>
    </View>
  );
}
