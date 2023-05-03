import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import Analytics from './Analytics';
import ProfileScreen from './ProfileScreen';
import SettingScreen from './SettingScreen';
import ProductDetailScreen from './ProductDetailsScreen';
import PayrollPage from './PayRoll';
import AttendanceForm from './Attendence';
import SupportPage from './Support';
import SignInSignUpPage from './Signin';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ProductDetails" options={{ headerShown: false }} component={ProductDetailScreen} />
      <Stack.Screen name="PayRoll" options={{ headerShown: false }} component={PayrollPage} />
      <Stack.Screen name="Attendence" options={{ headerShown: false }} component={AttendanceForm} />
      <Stack.Screen name="Support" options={{ headerShown: false }} component={SupportPage} />
      <Stack.Screen name="Login"  options={{headerShown:false}} component={SignInSignUpPage} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Analytics':
                iconName = 'analytics';
                break;
              case 'Profile':
                iconName = 'person';
                break;
              case 'Setting':
                iconName = 'settings';
                break;
              default:
                iconName = 'home';
                break;
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        // screenOptions={{
        //   activeTintColor: 'tomato',
        //   inactiveTintColor: 'gray',
        // }}
        >
        <Tab.Screen name="Home" options={{headerShown:false }} component={HomeStack} />
        <Tab.Screen name="Analytics" component={Analytics} />
       
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
