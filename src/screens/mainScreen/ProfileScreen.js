import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/auth-selector';
import { authSingOutUser } from "../../redux/auth/auth-operations";
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container } from '../../components/Container';
import { Avatar } from '../../components/Avatar';
import { Title } from '../../components/Title';
import { PostCard } from '../../components/PostCard';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function ProfileScreen() {
    const [userPosts, setUserPosts] = useState([]);
    const { userId, nickname } = useSelector(selectUser);
    const dispatch = useDispatch();

    const getUserPosts = async () => {
        const userQuery = query(collection(db, "posts"), where("userId", "==", userId));
        
        onSnapshot(userQuery, (data) =>
            setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
    }

    useEffect(() => {
        getUserPosts();
    },[])
    
    return (
        <Container>
            <View style={styles.wrapper}>
                <Avatar />

                <TouchableOpacity
                    style={styles.iconLogout}
                    activeOpacity={0.8}
                    onPress={()=> dispatch(authSingOutUser())} >
                    <MaterialIcons name="logout" size={26} color={theme.colors.placeholder} />
                </TouchableOpacity> 

                <Title>{nickname}</Title>

                <FlatList data={userPosts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                         <PostCard
                            postId={item.id}
                            photo={item.imageURL}
                            title={item.title}
                            latitude={item.latitude}
                            longitude={item.longitude}
                            locationName={item.locationName} />
                    )} 
                />
            </View>    
        </Container>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
        minHeight: 600,
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