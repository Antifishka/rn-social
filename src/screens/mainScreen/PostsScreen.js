import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

export default function PostsScreen({ route }) {
    const [posts, setPosts] = useState([]);
    console.log("route.params", route.params);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params]);
        }
    }, [route.params]);
    console.log("posts", posts); 

    return (
        <View style={styles.container}>
            <FlatList data={posts}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <View style={{marginBottom: 32, flex: 1, borderRadius: 8}}>
                        <Image source={{ uri: item.photo }}
                            style={{ height: 240, overflow: 'hidden' }} />
                    </View>  
                )} 
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 32,
        paddingHorizontal: 16,
    },
});