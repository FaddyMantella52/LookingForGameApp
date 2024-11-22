// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { View, Text, StyleSheet } from 'react-native';
// import HomeScreen from './screens/HomeScreen'; // Replace with your actual path
// import ProfileScreen from './screens/ProfileScreen'; // Replace with your actual path
// import SelectGameScreen from './screens/SelectGameScreen'; // Replace with your actual path
// import { Ionicons } from '@expo/vector-icons'; // Optional for icons

// const Tab = createBottomTabNavigator();

// export default function MainTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarStyle: { backgroundColor: '#000' }, // Black tab bar
//           tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//           tabBarActiveTintColor: '#fff',
//           tabBarInactiveTintColor: '#888',
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Profile') {
//             iconName = focused ? 'person' : 'person-outline';
//           } else if (route.name === 'Search') {
//             iconName = focused ? 'search' : 'search-outline';
//           }

//           // Return Ionicons component (optional)
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: 'tomato',
//         tabBarInactiveTintColor: 'gray',
//         swipeEnabled: true, // Enable swipe gestures
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//       <Tab.Screen name="Search" component={SelectGameScreen} />
//     </Tab.Navigator>
//   );
// }

