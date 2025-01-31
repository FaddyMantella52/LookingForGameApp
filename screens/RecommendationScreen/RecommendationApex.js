import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { getFirestore, collection, getDocs, doc , getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import backgroundImage from "../../assets/BackGroundImage.png"; // Make sure to import the background image

const RecommendationApex = ({ route, navigation }) => {
  const { userSettings } = route.params; // receive the saved user settings from ApexSettings
  const [matches, setMatches] = useState([]);
  const firestore = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    // Fetch all users and compare with current user's settings
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, 'apexSettings'));
        const allUsers = [];

        for (const docSnapshot of usersSnapshot.docs) {
          const user = docSnapshot.data();
          if (docSnapshot.id !== auth.currentUser?.uid) {
            let score = 0;

            // Calculate match score based on user's preferences
            if (user.region === userSettings.region) score += 5;
            if (user.rank === userSettings.rank) score += 5;
            if (user.mainLanguage === userSettings.mainLanguage) score += 5;
            if (user.secondaryLanguage === userSettings.secondaryLanguage) score += 3;
            if (user.mainRole === userSettings.mainRole) score += 2;


            // Fetch username and profile picture from the 'users' collection
             const userDocRef = doc(firestore, 'users', docSnapshot.id);
             const userDocSnapshot = await getDoc(userDocRef);

             const username = userDocSnapshot.exists() ? userDocSnapshot.data().username : 'Unknown';
             const profilePicture = userDocSnapshot.exists() ? userDocSnapshot.data().profilePicture : 'defaultProfilePicUrl'; // Add a fallback profile picture

              allUsers.push({
                id: docSnapshot.id,
                username,
                profilePicture,
                score,
                region: user.region,
                rank: user.rank,
                mainLanguage: user.mainLanguage,
                secondaryLanguage: user.secondaryLanguage,
                mainRole: user.mainRole,
            });
          }
        }

        // Sort users by score in descending order
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
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ChatScreen', { userId: item.id, username: item.username })}
            >
              <View style={styles.profileContainer}>
                <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
                <Text style={styles.username}>{item.username}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.text}>Region: {item.region}</Text>
                <Text style={styles.text}>Language: {item.mainLanguage}</Text>
                <Text style={styles.text}>Role: {item.mainRole}</Text>
                <Text style={styles.text}>Score: {item.score}</Text>
              </View>
            </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slight transparency to see background image
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

export default RecommendationApex;
