import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';

export default function NewsScreen({ route, navigation }) {
  const { news } = route.params;

  const handleReadMore = (url) => {
    if (url) {
      Linking.openURL(url).catch(() => alert("Invalid link!"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Video Game News</Text>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsCard}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
            <TouchableOpacity onPress={() => handleReadMore(item.url)}>
              <Text style={styles.readMore}>Read more...</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  newsCard: {
    backgroundColor: '#2c2c2c',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  newsDescription: {
    color: '#ccc',
    marginVertical: 10,
  },
  readMore: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
