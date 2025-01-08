import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import LogInScreen from './screens/LogInScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SetUpProfilePicture from './screens/AfterRegisterScreens/SetUpProfilePicture';
import LinkAccountsScreen from './screens/AfterRegisterScreens/LinkAccountsScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
import ProfileScreen from './screens/ProfileScreen';
import SelectGameScreen from './screens/SelectGameScreen';
import LeagueOfLegendsSettings from './screens/SelectGameScreens/LeagueOfLegendsSettings';
import CSGOSettings from './screens/SelectGameScreens/CSGOSettings';
import ApexLegendsSettings from './screens/SelectGameScreens/ApexLegendsSettings';
import Dota2Settings from './screens/SelectGameScreens/Dota2Settings';
import RecommendationLol from './screens/RecommendationScreen/RecommendationLol';
import RecommendationDota2 from './screens/RecommendationScreen/RecommendationDota2';
import RecommendationApex from './screens/RecommendationScreen/RecommendationApex';
import RecommendationCSGO from './screens/RecommendationScreen/RecommendationCSGO';
import NewsScreen from './screens/NewsScreen';


enableScreens();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#000' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Search" component={SelectGameScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Authentication Screens */}
        <Stack.Screen options={{ headerShown: false }} name="LogInScreen" component={LogInScreen} />
        <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />

        {/* After Registration Screens */}
        <Stack.Screen options={{ headerShown: false }} name="SetUpProfilePicture" component={SetUpProfilePicture} />
        <Stack.Screen options={{ headerShown: false }} name="LinkAccountsScreen" component={LinkAccountsScreen} />
        <Stack.Screen options={{ headerShown: false }} name="VerifyEmailScreen" component={VerifyEmailScreen} />

        {/* Main App */}
        <Stack.Screen options={{ headerShown: false }} name="Main" component={BottomTabNavigator} />

        {/* Home Screens */}
        <Stack.Screen options={{ headerShown: false }} name="NewsScreen" component={NewsScreen} />

        {/* Game Selection Screens */}
        <Stack.Screen options={{ headerShown: false }} name="SelectGameScreen" component={SelectGameScreen} />
        <Stack.Screen options={{ headerShown: false, title: 'League of Legends Settings' }} name="LeagueOfLegendsSettings" component={LeagueOfLegendsSettings} />
        <Stack.Screen options={{ headerShown: false, title: 'CS:GO Settings' }} name="CSGOSettings" component={CSGOSettings} />
        <Stack.Screen options={{ headerShown: false, title: 'Apex Legends Settings' }} name="ApexLegendsSettings" component={ApexLegendsSettings} />
        <Stack.Screen options={{ headerShown: false, title: 'Dota 2 Settings' }} name="Dota2Settings" component={Dota2Settings} />

        {/* {RecommendationsScreen} */}
        <Stack.Screen options={{ headerShown: false }} name="RecommendationLol" component={RecommendationLol} />
        <Stack.Screen options={{ headerShown: false }} name="RecommendationDota2" component={RecommendationDota2} />
        <Stack.Screen options={{ headerShown: false }} name="RecommendationCSGO" component={RecommendationCSGO} />
        <Stack.Screen options={{ headerShown: false }} name="RecommendationApex" component={RecommendationApex} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
