import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function PostsScreen({ route, navigation }) {
    const [posts, setPosts] = useState([]);
    console.log("route.params", route.params);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params.postData]);
        }
    }, [route.params]);
    console.log("posts", posts); 

    return (
        <View style={styles.container}>
            <FlatList data={posts}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <View style={styles.imgThumb}>
                            <Image source={{ uri: item.photo }}
                                style={{ height: 240 }}
                                alt='picture' />
                        </View> 

                        <Text style={styles.title}>{item.title}</Text>

                        <View style={styles.postInfo}>
                            <TouchableOpacity style={styles.comments}
                                onPress={() => navigation.navigate('Comments')}>
                                <Feather name="message-circle" size={24}
                                    color={theme.colors.placeholder}
                                    />
                                <Text style={{
                                    ...styles.description,
                                    color: theme.colors.placeholder}}>0
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.location}
                                onPress={() => navigation.navigate('Map')}>
                                <Feather name="map-pin" size={24} color={theme.colors.placeholder} />
                                <Text style={{
                                    ...styles.description,
                                    textDecorationLine: "underline"}}>{item.locationName}
                                </Text>
                            </TouchableOpacity>
                        </View>
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
    post: {
        width: "100%",
        height: 299,
        marginBottom: 32,
    },
    imgThumb: {
        overflow: "hidden",
        flex: 1,
        marginBottom: 8,
        borderRadius: 8
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
});