import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ApexLegendsSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Apex Legends Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ApexLegendsSettings;
