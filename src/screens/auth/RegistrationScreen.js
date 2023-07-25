import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RegistrationScreen ({navigation}) {
    return (
        <View style={styles.container}>
            <Text>RegistrationScreen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.text}>
                    Уже есть аккаунт? Войти
                </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        textAlign: "center",
        color: "#1B4371",
    },
});