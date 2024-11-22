import React from 'react';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#000' }, // Black tab bar
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Search" component={SelectGameScreen} />
    </Tab.Navigator>
  );
}

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
