import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/auth-selector";
import { updateLikes } from "../firebase/updateLikes";
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from "../constants/theme";

export const Likes = ({ postId, likes, likesCount, isLiked, screen }) => {
    const { userId } = useSelector(selectUser);
    
    return (
        <TouchableOpacity style={styles.wrapper}
            onPress={() => updateLikes(likes, postId, userId)}>
            <Feather name="thumbs-up" size={24}
                color={isLiked ? theme.colors.accent : theme.colors.placeholder} />
            <Text style={{ ...styles.count,
                color: screen === 'profile' ? theme.colors.mainText : theme.colors.placeholder }}>
                {likesCount}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginLeft: 24,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    count: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
    }
})   