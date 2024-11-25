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
      tabBarOptions={{
        gestureEnabled: true, // Enable swipe gestures
        keyboardHidesTabBar: true,
      }}
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
      <Stack.Screen options = {{headerShown: false}} name="LogInScreen" component={LogInScreen} />
      <Stack.Screen options = {{headerShown: false}} name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen options = {{headerShown: false}} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      {/* <Stack.Screen options = {{headerShown: false}} name="HomeScreen" component={HomeScreen} /> */}
      <Stack.Screen options = {{headerShown: false}} name="SetUpProfilePicture" component={SetUpProfilePicture} />
      <Stack.Screen options = {{headerShown: false}} name="LinkAccountsScreen" component={LinkAccountsScreen} />
      <Stack.Screen options = {{headerShown: false}} name="VerifyEmailScreen" component={VerifyEmailScreen} />
      <Stack.Screen options = {{headerShown: false}} name="ProfileScreen" component={ProfileScreen} />
      {/* <Stack.Screen options = {{headerShown: false}} name="SelectGameScreen" component={SelectGameScreen} /> */}
      <Stack.Screen options = {{headerShown: false}} name="Main" component={BottomTabNavigator} />
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
  }
});
