import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route }) {
    const { latitude, longitude, title } = route.params;
    console.log("route.params from Map", route.params);
    
    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ flex: 1 }}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.006,
                }}
                mapType="standard"
                minZoomLevel={15} >
                <Marker
                    coordinate={{ latitude, longitude }}
                    title={title} />
            </MapView>
        </View>
    )
};