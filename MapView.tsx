import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import RNMapView from 'react-native-maps';
import {lightTheme} from './src/constants/maps';
import config from './src/constants/config';

interface MapViewProps {
  latitude: number;
  longitude: number;
}

const MapView = ({latitude, longitude}: MapViewProps) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (latitude && longitude && mapRef.current) {
      mapRef.current!.animateCamera({
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 12,
      });
    }
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <RNMapView
        ref={mapRef}
        customMapStyle={lightTheme}
        initialCamera={{
          center: {
            latitude: config.INITIAL_LATITUDE,
            longitude: config.INITIAL_LONGITUDE,
          },
          heading: config.HEADING,
          pitch: config.PITCH,
          altitude: config.ALTITUDE,
          zoom: config.ZOOM,
        }}
        loadingEnabled
        showsBuildings={false}
        loadingBackgroundColor="white"
        style={StyleSheet.absoluteFillObject}
        rotateEnabled={false}
      />
    </View>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
