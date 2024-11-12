import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import LogInScreen from './screens/LogInScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SetUpUsernameScreen from './screens/AfterRegisterScreens/SetUpUsernameScreen';
import LinkAccountsScreen from './screens/AfterRegisterScreens/LinkAccountsScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options = {{headerShown: false}} name="LogInScreen" component={LogInScreen} />
      <Stack.Screen options = {{headerShown: false}} name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen options = {{headerShown: false}} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen options = {{headerShown: false}} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen options = {{headerShown: false}} name="SetUpUsernameScreen" component={SetUpUsernameScreen} />
      <Stack.Screen options = {{headerShown: false}} name="LinkAccountsScreen" component={LinkAccountsScreen} />
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
