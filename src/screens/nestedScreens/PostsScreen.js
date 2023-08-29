import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from '../../firebase/config';
import { UserCard } from '../../components/UserCard';
import { PostCard } from '../../components/PostCard';
import { theme } from '../../constants/theme';

export default function PostsScreen() {
    const [posts, setPosts] = useState([]);

    const getPosts = async() => {
        // receive posts from db
        onSnapshot(collection(db, "posts"), (data) =>
            setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
    }

    useEffect(() => {
        getPosts();
        console.log("posts", posts);
    }, []);

    return (
        <View style={styles.container}>
            <UserCard />
            
            <FlatList data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PostCard
                        postId={item.id}
                        photo={item.imageURL}
                        title={item.title}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        locationName={item.locationName}
                        likesCount={item.likesCount}
                        likes={item.likes}
                        isLiked={item.isLiked} />
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