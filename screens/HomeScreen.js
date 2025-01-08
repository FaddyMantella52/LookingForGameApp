import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, FlatList, Linking } from 'react-native';
import axios from 'axios';
import styles from './ScreenModules/HomeScreen.module.js';
import titleImage from "../assets/TitleWithNeonEffect.png"; 
import backgroundImage from "../assets/BackGroundImage.png";
import defaultImage from "../assets/defaultProfile.jpg";

const API_KEY = '3849447c2e704c50a32225774cb85964'; // Replace with your News API or GNews API key
const API_URL = 'https://newsapi.org/v2/everything?q=video%20games&sortBy=publishedAt&apiKey=' + API_KEY;

export default function HomeScreen({ navigation }) {
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

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("LogInScreen")} style={styles.menuButtonProfile}>
            <Image source={defaultImage} style={styles.profileImage} />
          </TouchableOpacity>
          <Image source={titleImage} style={styles.titleImage}></Image>
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
          {news.slice(0, 2).map((item, index) => (
            <View key={index} style={styles.newsCard}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={() => navigation.navigate("NewsScreen", { news })}>
            <Text style={styles.seeAllNews}>See All News</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}