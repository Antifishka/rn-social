import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { UserCard } from '../../components/UserCard';
import { PostCard } from '../../components/PostCard';
import { theme } from '../../constants/theme';

export default function PostsScreen({ route }) {
    const [posts, setPosts] = useState([]);
    console.log("route.params", route.params);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params.postData]);
        }
    }, [route.params]);
    console.log("posts", posts); 

    return (
        <View style={styles.container}>
            <UserCard />
            
            <FlatList data={posts}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <PostCard
                        photo={item.photo}
                        title={item.title}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        locationName={item.locationName} />
                )} 
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 32,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.white,
    },
});