import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from '../../firebase/config';
import { UserCard } from '../../components/UserCard';
import { PostList } from '../../components/PostList';
import { theme } from '../../constants/theme';

export default function PostsScreen() {
    const [initialPosts, setInitialPosts] = useState([]);

    const getPosts = async() => {
        // receive posts from db
        onSnapshot(collection(db, "posts"), (data) =>
            setInitialPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
    }

    useEffect(() => {
        getPosts();
    }, []);
    console.log('initialPosts', initialPosts)

    return (
        <View style={styles.container}>
            <UserCard />

            <PostList initialPosts={initialPosts} />
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