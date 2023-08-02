import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from '../nestedScreens/PostsScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';

const NestedScreen = createStackNavigator();

const HomeScreen = () => {
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen name='Posts'
                component={PostsScreen}
                options={{
                    headerShown: false
                }} />
            <NestedScreen.Screen name='Comments' component={CommentsScreen} />
            <NestedScreen.Screen name='Map' component={MapScreen} />
        </NestedScreen.Navigator>
    )    
}

export default HomeScreen;