import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';
import DoctorProfileScreen from '../screens/home/DoctorProfileScreen';
import SlotPickerScreen from '../screens/booking/SlotPickerScreen';
import BookingSummaryScreen from '../screens/booking/BookingSummaryScreen';
import BookingConfirmationScreen from '../screens/booking/BookingConfirmationScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#1a4a7a',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: true,
          title: 'Register',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfileScreen}
        options={{
          headerShown: true,
          title: 'Doctor Profile',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SlotPicker"
        component={SlotPickerScreen}
        options={{
          headerShown: true,
          title: 'Select Slot',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="BookingSummary"
        component={BookingSummaryScreen}
        options={{
          headerShown: true,
          title: 'Booking Summary',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
