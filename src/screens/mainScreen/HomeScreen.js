import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from '../nestedScreens/PostsScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from "../../constants/theme";

const NestedScreen = createStackNavigator();

const HomeScreen = () => {
    return (
        <NestedScreen.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerStyle: styles.header,
            }}>
            <NestedScreen.Screen name='Posts'
                component={PostsScreen}
                options={{
                    headerTitle: "Публікації",
                    headerRight: () => (
                        <TouchableOpacity style={styles.iconLogout} activeOpacity={0.8} >
                            <MaterialIcons name="logout" size={26} color={theme.colors.placeholder} />
                        </TouchableOpacity>    
                    )
                }} />
            <NestedScreen.Screen name='Comments'
                component={CommentsScreen}
                options={{
                    headerTitle: "Коментарі"
                }}/>
            <NestedScreen.Screen name='Map'
                component={MapScreen}
                options={{
                    headerTitle: "Карта"
                }} />
        </NestedScreen.Navigator>
    )    
}

export default HomeScreen;

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.placeholder,
    },
    iconLogout: {
        marginRight: 10,
    },
})    