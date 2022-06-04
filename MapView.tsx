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
        pitch: config.PITCH,
        heading: config.HEADING,
        altitude: config.ALTITUDE,
        zoom: config.ZOOM,
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
            latitude: latitude ? latitude : config.INITIAL_LATITUDE,
            longitude: longitude ? longitude : config.INITIAL_LONGITUDE,
          },
          heading: config.HEADING,
          pitch: config.PITCH,
          altitude: config.ALTITUDE,
          zoom: config.ZOOM,
        }}
        loadingEnabled
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
