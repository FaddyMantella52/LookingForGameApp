import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, FlatList, Linking, Alert } from 'react-native';
import axios from 'axios';
import { doc, getDoc } from "firebase/firestore"; // Firestore methods
import { getAuth } from 'firebase/auth'; // Firebase Auth
import { db } from '../firebase'; // Firestore instance
import styles from './ScreenModules/HomeScreen.module.js';
import titleImage from "../assets/TitleWithNeonEffect.png";
import backgroundImage from "../assets/BackGroundImage.png";
import defaultImage from "../assets/defaultProfile.jpg";

const API_KEY = '3849447c2e704c50a32225774cb85964'; // Replace with your News API or GNews API key
const API_URL = 'https://newsapi.org/v2/everything?q=video%20games&sortBy=publishedAt&apiKey=' + API_KEY;

export default function HomeScreen({ navigation }) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userData, setUserData] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth(); // Get Firebase Auth instance
        const user = auth.currentUser; // Get the currently logged-in user

        if (user) {
          const userId = user.uid; // Get the user's unique ID (uid)

          // Fetch the user document from Firestore
          const userDocRef = doc(db, "users", userId); // Reference to the user's document
          const userDocSnap = await getDoc(userDocRef); // Fetch the document

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserData(userData); // Set the user data from Firestore
            setProfilePicture(userData.profilePicture || null); // Set profile picture if available
          } else {
            console.error('No such document found!');
            Alert.alert('Error', 'User data not found.');
          }
        } else {
          console.error('No user is logged in!');
          Alert.alert('Error', 'You must be logged in to view this screen.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("SetUpProfilePictureScreen")} style={styles.menuButtonProfile}>
            <Image source={profilePicture ? { uri: profilePicture } : defaultImage} style={styles.profileImage} />
          </TouchableOpacity>
          <Image source={titleImage} style={styles.titleImage} />
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>☰</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Patch Notes/App Changes</Text>
          </TouchableOpacity>
        </View>

        {/* News Box */}
        <View style={styles.newsBox}>
          <Text style={styles.newsBoxTitle}>Latest News</Text>
          {news.length > 0 ? (
            news.slice(0, 2).map((item, index) => (
              <View key={index} style={styles.newsCard}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
              </View>
            ))
          ) : (
            <Text>No news available yet!</Text>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("NewsScreen", { news })}>
            <Text style={styles.seeAllNews}>See All News</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
