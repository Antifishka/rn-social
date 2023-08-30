import React, { useState, useEffect } from "react";
import { db } from '../firebase/config';
import { collection, doc, onSnapshot } from "firebase/firestore"; 
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Photo } from "./Photo";
import { Likes } from "./Likes";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { theme } from "../constants/theme";

export const PostCard = ({ screen, postId, photo, title, latitude, longitude, locationName, likes, likesCount, isLiked }) => {
    const navigation = useNavigation();
    const [comments, setComments] = useState();

    const getComments = async () => {
        const postRef = doc(db, "posts", postId); // find post
        const commentsListRef = collection(postRef, "comments"); // find comments collection

        onSnapshot(commentsListRef, (data) =>
            setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
    }

    useEffect(() => {
        getComments();
    }, []);

    return (
        <View style={styles.post}>
            <Photo photo={photo} />

            <Text style={styles.title}>{title}</Text>

            <View style={styles.postInfo}>
                <TouchableOpacity style={styles.comments}
                    onPress={() => navigation.navigate('Comments', { photo, postId})}>
                    <Feather name="message-circle"
                        size={24}
                        color={screen === 'profile' ? theme.colors.accent : theme.colors.placeholder} />
                    <Text style={{
                        ...styles.count,
                        color: screen === 'profile' ? theme.colors.mainText : theme.colors.placeholder}} >
                        {comments?.length}
                    </Text>
                </TouchableOpacity>

                <Likes screen={screen}
                    postId={postId}
                    likes={likes}
                    likesCount={likesCount}
                    isLiked={isLiked} />

                <TouchableOpacity style={styles.location}
                    onPress={() => navigation.navigate('Map',
                        { latitude, longitude, title }
                    )}>
                    <Feather name="map-pin" size={24} color={theme.colors.placeholder} />
                        <Text style={{
                            ...styles.description,
                            textDecorationLine: "underline"}}>{locationName}
                        </Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    post: {
        width: "100%",
        height: 299,
        marginBottom: 32,
    },
    title: {
        marginBottom: 8,
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: theme.colors.mainText,
    },
    postInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    comments: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
        gap: 4,
    },
    count: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: theme.colors.mainText,
    }
})