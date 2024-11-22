import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from './ScreenModules/HomeScreen.module.js';
import titleImage from "../assets/TitleWithNeonEffect.png"; 
import backgroundImage from "../assets/BackGroundImage.png";
import defaultImage from "../assets/defaultProfile.jpg";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background} // Style for the background
    >
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("LogInScreen")} style={styles.menuButtonProfile}>
          <Image
          source={defaultImage}
          style={styles.profileImage}
          >
          </Image>
        </TouchableOpacity>
        <Image source={titleImage} style={styles.titleImage}></Image>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>NEWS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SelectGameScreen</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}