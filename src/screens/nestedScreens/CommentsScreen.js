import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Photo } from '../../components/Photo';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function CommentsScreen({ route }) {
    const [message, setMessage] = useState('');
    const { photo } = route.params

    return (
        <View style={styles.container}>
            <Photo photo={photo} />

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Коментувати..."
                    placeholderTextColor={theme.colors.placeholder}
                    value={message}
                    onChangeText={(e) => setMessage(e)} />
            </View>
            
            <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                <AntDesign name="arrowup" size={22} color={theme.colors.white} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.white,
    },
    inputWrapper: {
        position: "relative",
    },
    input: {
        height: 50,
        marginTop: "auto",
        marginBottom: 16,
        paddingLeft: 16,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        fontWeight: 500,
        backgroundColor: theme.colors.background,
    },
    btn: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 34,
        height: 34,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.accent,
    }
});