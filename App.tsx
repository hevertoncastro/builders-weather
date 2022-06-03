import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import MapView from 'react-native-maps';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: 'white',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <MapView
        style={styles.mapViewHolder}
        initialRegion={{
          latitude: -20.541694141217988,
          longitude: -47.40412160754204,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mapViewHolder: {
    flex: 1,
  },
});

export default App;
