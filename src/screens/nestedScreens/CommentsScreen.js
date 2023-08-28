import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase/config';
import { selectUser } from '../../redux/auth/auth-selector';
import { collection, doc, addDoc, onSnapshot } from "firebase/firestore"; 
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Photo } from '../../components/Photo';
import { Comment } from '../../components/Comment';
import dayjs from 'dayjs';
import 'dayjs/locale/uk'
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function CommentsScreen({ route }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const { photo, postId } = route.params;
    const { userId, avatarURL } = useSelector(selectUser);

    const addComment = async () => {
        const postRef = doc(db, "posts", postId); // find post
        const commentsListRef = collection(postRef, "comments"); // find comments collection
        const commentRef = await addDoc(commentsListRef, {
            comment,
            userId,
            avatarURL,
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

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <Photo photo={photo} />

                <FlatList data={comments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Comment
                            isCurrentUser={item.userId === userId ? true : false}
                            text={item.comment}
                            createdAt={dayjs(item.createdAt).locale('uk').format(
                                'DD MMMM, YYYY | HH:mm'
                            )}
                            avatarURL={item.avatarURL} />
                    )} 
                />

                <View style={isShowKeyboard ? styles.inputWrapperKeyboard : styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Коментувати..."
                        placeholderTextColor={theme.colors.placeholder}
                        value={comment}
                        onFocus={()=> setIsShowKeyboard(true)}
                        onChangeText={(e) => setComment(e)} />
                    
                    <TouchableOpacity
                        style={{ ...styles.btn,
                            top: isShowKeyboard ? 18 : 24 }}
                        activeOpacity={0.8}
                        onPress={onSubmit}>
                        <AntDesign name="arrowup" size={22} color={theme.colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>   
    )
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.white,
    },
    inputWrapper: {
        position: "relative",
        marginTop: "auto",
        paddingVertical: 16,
        backgroundColor: theme.colors.white,
    },
    inputWrapperKeyboard: {
        position: "absolute",
        paddingVertical: 10,
        left: 16,
        right: 16,
        bottom: 256,
        backgroundColor: theme.colors.white,
    },
    input: {
        height: 50,
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
        right: 8,
        width: 34,
        height: 34,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.accent,
    }
});