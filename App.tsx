import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Button,
  PermissionsAndroid,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView from './MapView';
import config from './src/constants/config';

const App = () => {
  const [latitude, setLatitude] = useState(config.INITIAL_LATITUDE);
  const [longitude, setLongitude] = useState(config.INITIAL_LONGITUDE);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: 'white',
  };

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      console.log('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        'Turn on Location Services to allow Builders Weather to determine your location.',
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      console.log('Location permission denied by user.');
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('Location permission revoked by user.');
    }

    return false;
  };

  const getDeviceCurrentLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        setLatitude(config.INITIAL_LATITUDE);
        setLongitude(config.INITIAL_LONGITUDE);
        console.log(error);
      },
      {
        accuracy: {
          android: 'balanced',
          ios: 'kilometer',
        },
        timeout: 15000,
        distanceFilter: 0,
        enableHighAccuracy: false,
      },
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Button
        title="Get Current Device Location"
        onPress={getDeviceCurrentLocation}
      />
      <MapView latitude={latitude} longitude={longitude} />
    </SafeAreaView>
  );
};

export default App;
