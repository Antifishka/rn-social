import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/auth-selector';
import { authSingOutUser } from "../../redux/auth/auth-operations";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { pickImage } from '../../helpers/pickImage';
import { addUserPhotoToServer, removeUserPhotoFromServer } from '../../redux/auth/auth-operations';
import { Container } from '../../components/Container';
import { Avatar } from '../../components/Avatar';
import { Title } from '../../components/Title';
import { PostList } from '../../components/PostList';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function ProfileScreen() {
    const [initUserPosts, setInitUserPosts] = useState([]);
    const { userId, nickname, avatarURL} = useSelector(selectUser);
    const dispatch = useDispatch();

    const getUserPosts = async () => {
        const userQuery = query(collection(db, "posts"), where("userId", "==", userId));
        
        onSnapshot(userQuery, (data) =>
            setInitUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
    }

    useEffect(() => {
        getUserPosts();
    }, [])
    
    const getUserPhoto = async () => {
        const result = await pickImage();

        dispatch(addUserPhotoToServer(result));
    }
    
    return (
        <Container>
            <View style={styles.wrapper}>
                <Avatar avatar={avatarURL}
                    addAvatar={getUserPhoto}
                    removeAvatar={() => dispatch(removeUserPhotoFromServer())} />

                <TouchableOpacity
                    style={styles.iconLogout}
                    activeOpacity={0.8}
                    onPress={()=> dispatch(authSingOutUser())} >
                    <MaterialIcons name="logout" size={26} color={theme.colors.placeholder} />
                </TouchableOpacity> 

                <Title>{nickname}</Title>

                <PostList screen='profile' 
                    initialPosts={initUserPosts} />
            </View>    
        </Container>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
        height: '100%',
        marginTop: 140,
        paddingTop: 22,
        paddingHorizontal: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: theme.colors.white,
    },
    iconLogout: {
        marginLeft: "auto",
        marginRight: 16,
        marginBottom: 46,
    }
});