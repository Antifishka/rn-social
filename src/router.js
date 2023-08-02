import React from 'react';
import { StyleSheet, View, Platform } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import HomeScreen from "./screens/mainScreen/HomeScreen";
import CreateScreen from "./screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";
import { theme } from "./constants/theme";

// icons import
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
    // Helper function to create a custom tab icon
    const createTabIcon = (name, focused, backgroundColor, color) => (
        <View style={{ ...styles.iconWrapper, backgroundColor }}>
            <Ionicons name={name} size={24} color={color} />
        </View>
    );

    if (!isAuth) {
        return <AuthStack.Navigator>
            <AuthStack.Screen
                options={{
                    headerShown: false
                }}
                name='Login'
                component={LoginScreen} />
            <AuthStack.Screen
                options={{
                    headerShown: false
                }}
                name='Registration'
                component={RegistrationScreen} />
        </AuthStack.Navigator>
    };
    
    return <MainTab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            headerStyle: styles.header,
            headerTitleAlign: "center",
            tabBarStyle: styles.tabBar,
        }}>
        <MainTab.Screen name='Home'
            component={HomeScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                    createTabIcon(
                        "grid-outline",
                        focused,
                        focused ? theme.colors.accent : "transparent",
                        focused ? theme.colors.white : theme.colors.secondaryText
                    ),               
            }}
        />
        <MainTab.Screen name='Create'
            component={CreateScreen}
            options={{
                headerTitle: "Створити публікацію",
                tabBarIcon: ({ focused }) => 
                    createTabIcon(
                        "add-outline",
                        focused,
                        focused ? theme.colors.accent : "transparent",
                        focused ? theme.colors.white : theme.colors.secondaryText
                    ),
            }}
        />
        <MainTab.Screen name='Profile'
            component={ProfileScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{...styles.iconWrapper,
                        backgroundColor: focused
                            ? `${theme.colors.accent}`
                            : "transparent"}} >
                        <Feather name="user"
                            size={24}
                            color={ focused
                                ? `${theme.colors.white}`
                                : `${theme.colors.secondaryText}`
                            } />
                    </View>    
                )
            }}
        />
    </MainTab.Navigator>
};

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.placeholder,
        // fontFamily: "Roboto-Medium",
        // fontSize: 17,
    },
    iconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 40,
        marginTop: 9,
        marginBottom: Platform.OS === 'android' ? 22 : 0,
        borderRadius: 20
    },
    tabBar: {
        ...Platform.select({
            android: {
                height: 72,
            }
        }),
        marginBottomBottom: 22,
        borderTopWidth: 1,
        borderBottomColor: theme.colors.placeholder,
    }
});