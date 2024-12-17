import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import backgroundImage from '../assets/BackGroundImage.png';
import lolIcon from '../assets/lolIcon.png';
import csgoIcon from '../assets/csgoIcon.png';
import apexIcon from '../assets/apexIcon.png';
import dotaIcon from '../assets/dotaIcon.png';
import styles from './ScreenModules/SelectGameScreen.module';

export default function SelectGameScreen({ navigation }) {
  const games = [
    { name: 'League of Legends', icon: lolIcon, screen: 'LeagueOfLegendsSettings' },
    { name: 'CS:GO', icon: csgoIcon, screen: 'CS_GOSettings' },
    { name: 'Apex Legends', icon: apexIcon, screen: 'ApexLegendsSettings' },
    { name: 'Dota 2', icon: dotaIcon, screen: 'Dota2Settings' },
  ];

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        {games.map((game, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gameButton}
            onPress={() => navigation.navigate(game.screen)}
          >
            <Image source={game.icon} style={styles.gameIcon} />
            <Text style={styles.gameText}>{game.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}
