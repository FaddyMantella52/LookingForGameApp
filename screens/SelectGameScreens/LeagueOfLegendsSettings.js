import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeagueOfLegendsSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>League of Legends Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LeagueOfLegendsSettings;