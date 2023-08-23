import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase/config';
import { selectUser } from '../../redux/auth/auth-selector';
import { collection, doc, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore"; 
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Photo } from '../../components/Photo';
import { Comment } from '../../components/Comment';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function CommentsScreen({ route }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { photo, postId } = route.params;
    const { nickname } = useSelector(selectUser);

    const addComment = async () => {
        const postRef = doc(db, "posts", postId); // find post
        const commentsListRef = collection(postRef, "comments"); // find comments collection
        const commentRef = await addDoc(commentsListRef, {
            comment,
            nickname,
            timestamp: serverTimestamp(),
        });

        console.log("Document written with ID: ", commentRef.id);
    }

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

    const onSubmit = () => {
        addComment();

        console.log('comment', comment);
        setComment('');
    }

    return (
        <View style={styles.container}>
            <Photo photo={photo} />

            <FlatList data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Comment
                        text={item.comment}
                        time={item.timestamp} />
                )} 
            />

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Коментувати..."
                    placeholderTextColor={theme.colors.placeholder}
                    value={comment}
                    onChangeText={(e) => setComment(e)} />
                
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.8}
                    onPress={onSubmit}>
                    <AntDesign name="arrowup" size={22} color={theme.colors.white} />
                </TouchableOpacity>
            </View>
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
        top: 8,
        right: 8,
        width: 34,
        height: 34,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.accent,
    }
});