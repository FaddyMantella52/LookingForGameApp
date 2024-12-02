import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CS_GOSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CS:GO Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CS_GOSettings;
