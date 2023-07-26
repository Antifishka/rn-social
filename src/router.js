import React from 'react';
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreateScreen from "./screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";
import { theme } from "./constants/theme";

// icons import
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
            headerStyle: styles.header,
            tabBarStyle: styles.tabBar,
        }}>
        <MainTab.Screen name='Posts'
            component={PostsScreen}
            options={{
                headerTitle: "Публікації",
                tabBarIcon: ({ focused }) => (
                    <View style={{...styles.iconWrapper,
                        backgroundColor: focused
                            ? `${theme.colors.accent}`
                            : "transparent"}} >
                        <Ionicons name="grid-outline"
                            size={24}
                            color={ focused
                                ? `${theme.colors.white}`
                                : `${theme.colors.secondaryText}`
                            } />
                    </View>    
                ),

            }}
        />
        <MainTab.Screen name='Create'
            component={CreateScreen}
            options={{
                headerTitle: "Створити публікацію",
                tabBarIcon: ({ focused }) => (
                    <View style={{...styles.iconWrapper,
                        backgroundColor: focused
                            ? `${theme.colors.accent}`
                            : "transparent"}} >
                        <Ionicons name="add-outline"
                            size={24}
                            color={ focused
                                ? `${theme.colors.white}`
                                : `${theme.colors.secondaryText}`
                            } />
                    </View>
                )
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
        borderRadius: 20
    },
    tabBar: {
        borderTopWidth: 1,
        borderBottomColor: theme.colors.placeholder,
    }
});