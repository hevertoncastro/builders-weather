import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import RNMapView from 'react-native-maps';
import {darkTheme, lightTheme} from '../../constants/maps';
import config from '../../constants/config';
import {black, white, primary} from '../../constants/colors';

interface MapViewProps {
  theme: 'dark' | 'light';
  latitude: number;
  longitude: number;
  onChangeLocation: (newLatitude: number, newLongitude: number) => void;
}

const MapView = ({
  theme,
  latitude,
  longitude,
  onChangeLocation,
}: MapViewProps) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (
      latitude &&
      longitude &&
      latitude !== config.INITIAL_LATITUDE &&
      longitude !== config.INITIAL_LONGITUDE &&
      mapRef.current
    ) {
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
        customMapStyle={theme === 'dark' ? darkTheme : lightTheme}
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
        showsCompass={false}
        mapPadding={{bottom: 200, left: 64, right: 0, top: 0}}
        loadingEnabled
        loadingIndicatorColor={primary}
        loadingBackgroundColor={theme === 'dark' ? black : white}
        style={StyleSheet.absoluteFillObject}
        rotateEnabled={false}
        onRegionChangeComplete={region => {
          onChangeLocation(region.latitude, region.longitude);
        }}
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
