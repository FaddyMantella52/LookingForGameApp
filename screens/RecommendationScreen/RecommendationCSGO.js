import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import backgroundImage from "../../assets/BackGroundImage.png";

const RecommendationCSGO = ({ route, navigation }) => {
  const { userSettings } = route.params;
  const [matches, setMatches] = useState([]);

  const firestore = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, 'csgoSettings'));
        const allUsers = [];

        usersSnapshot.forEach((doc) => {
          const user = doc.data();
          if (doc.id !== auth.currentUser?.uid) {
            let score = 0;

            if (user.region === userSettings.region) score += 5;
            if (user.rank === userSettings.rank) score += 5;
            if (user.mainRole === userSettings.mainRole) score += 3;

            allUsers.push({
              id: doc.id,
              ...user,
              score,
              username: user.username,
              profilePictureUrl: user.profilePictureUrl,
            });
          }
        });

        allUsers.sort((a, b) => b.score - a.score);
        setMatches(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch recommended users. Please try again.');
      }
    };

    fetchUsers();
  }, [userSettings]);

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Recommended Players</Text>
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.profileContainer}>
                <Image source={{ uri: item.profilePictureUrl }} style={styles.profilePicture} />
                <Text style={styles.username}>{item.username}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.text}>Region: {item.region}</Text>
                <Text style={styles.text}>Rank: {item.rank}</Text>
                <Text style={styles.text}>Role: {item.mainRole}</Text>
                <Text style={styles.text}>Score: {item.score}</Text>
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1c1c1c',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 5,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecommendationCSGO;
