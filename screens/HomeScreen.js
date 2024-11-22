import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from './ScreenModules/HomeScreen.module.js';
import titleImage from "../assets/TitleWithNeonEffect.png"; 
import backgroundImage from "../assets/BackGroundImage.png";

export default function HomeScreen() {
  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background} // Style for the background
    >
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={titleImage} style={styles.titleImage}></Image>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText}>NEWS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText}>Patch Notes/App Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}