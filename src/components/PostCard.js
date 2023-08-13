import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Photo } from "./Photo";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { theme } from "../constants/theme";

export const PostCard = ({ postId, photo, title, latitude, longitude, locationName, comments }) => {
    const navigation = useNavigation();
    console.log("comments", comments);

    return (
        <View style={styles.post}>
            <Photo photo={photo} />

            <Text style={styles.title}>{title}</Text>

            <View style={styles.postInfo}>
                <TouchableOpacity style={styles.comments}
                    onPress={() => navigation.navigate('Comments', { photo, postId})}>
                    <Feather name="message-circle"
                        size={24}
                        color={theme.colors.placeholder}/>
                    <Text style={{
                        ...styles.description,
                        color: theme.colors.placeholder}} >
                        {comments ? comments.length : '0'}
                    </Text>
                </TouchableOpacity>

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
        gap: 4,
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
        gap: 4,
    },
    description: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: theme.colors.mainText,
    }
})