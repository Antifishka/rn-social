import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/auth-selector";
import { likedPostsHandler } from "../helpers/likedPostHandler";
import { FlatList } from 'react-native';
import { PostCard } from './PostCard';

export const PostList = ({ screen, initialPosts }) => {
    const [posts, setPosts] = useState([]);
    const { userId } = useSelector(selectUser);

    useEffect(() => {
        const isLikedPosts = likedPostsHandler(initialPosts, userId);
        console.log('isLikedPosts', isLikedPosts);

        setPosts(isLikedPosts);
    }, [initialPosts]);
    
    return (
        <FlatList data={posts}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PostCard
                    screen={screen}
                    postId={item.id}
                    photo={item.imageURL}
                    title={item.title}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    locationName={item.locationName}
                    likesCount={item.likesCount}
                    likes={item.likes}
                    isLiked={item.isLiked}
                />
            )}
        />
    )
};