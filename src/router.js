import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreateScreen from "./screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

// import icons
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
    if (!isAuth) {
        return <AuthStack.Navigator>
        <AuthStack.Screen
            options={{
            headerShown: false
            }}
            name='Registration'
            component={RegistrationScreen} />
        <AuthStack.Screen
            options={{
            headerShown: false
            }}
            name='Login'
            component={LoginScreen} />
        </AuthStack.Navigator>
    };
    return <MainTab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
        }}>
        <MainTab.Screen name='Posts'
            component={PostsScreen}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="grid-outline" size={24} color="rgba(33, 33, 33, 0.8)" />
                )
            }}
        />
        <MainTab.Screen name='Create'
            component={CreateScreen}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="add-outline" size={24} color="rgba(33, 33, 33, 0.8)" />
                )
            }}
        />
        <MainTab.Screen name='Profile'
            component={ProfileScreen}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
                )
            }}
        />
    </MainTab.Navigator>
};