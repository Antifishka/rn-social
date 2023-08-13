import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/auth-selector';
import { FlatList, StyleSheet } from 'react-native';
import { Container } from '../../components/Container';
import { PostCard } from '../../components/PostCard';

export default function ProfileScreen() {
    const [userPosts, setUserPosts] = useState([]);
    const { userId } = useSelector(selectUser);

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
        </Container>
    )
};

const styles = StyleSheet.create({
});