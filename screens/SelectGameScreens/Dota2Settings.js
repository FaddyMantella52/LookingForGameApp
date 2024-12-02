import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dota2Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dota 2 Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dota2Settings;
