import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  PermissionsAndroid,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView from '../../components/MapView';
import config from '../../constants/config';
import WeatherWidget from '../../components/WeatherWidget';
import RoundButton from '../../components/RoundButton';
import {WeatherApiResponseType} from '../../types/weather';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';

export default function ({navigation, route}) {
  const {params}: any = route;
  const [latitude, setLatitude] = useState(config.INITIAL_LATITUDE);
  const [longitude, setLongitude] = useState(config.INITIAL_LONGITUDE);
  const [userCityCode, setUserCityCode] = useState(0);
  const [weatherData, setWeatherData]: WeatherApiResponseType | undefined =
    useState(undefined);

  useEffect(() => {
    if (params?.latitude && params?.longitude) {
      setLatitude(params?.latitude);
      setLongitude(params?.longitude);
    }
  }, [params]);

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

  const hasLocationPermission = useCallback(async () => {
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
  }, []);

  const getDeviceCurrentLocation = useCallback(async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords?.latitude);
        setLongitude(position.coords?.longitude);
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
  }, [hasLocationPermission]);

  const getDayAndNightTheme = (
    localTime: number,
    sunriseTime: number,
    sunsetTime: number,
  ) => {
    if (localTime >= sunriseTime && localTime < sunsetTime) {
      return 'day';
    } else {
      return 'night';
    }
  };

  // @TODO: Separate to services
  const getWeatherData = async (
    currentLatitude: number,
    currentLongitude: number,
  ) => {
    return await fetch(
      config.WEATHER_API_BASE_URL(
        currentLatitude,
        currentLongitude,
        'metric',
        '0888efd93e546e0469e210d3cac65c00',
      ),
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('weather', JSON.stringify(data, null, 2));
        return data;
      });
  };

  async function handleMapLocationChange(
    newLatitude: number,
    newLongitude: number,
  ) {
    const weatherResponse: WeatherApiResponseType = await getWeatherData(
      newLatitude,
      newLongitude,
    );
    if (weatherResponse) {
      setWeatherData(weatherResponse);
      if (weatherResponse.id !== userCityCode) {
        setUserCityCode(weatherResponse.id);
      }
    }
  }

  useEffect(() => {
    getDeviceCurrentLocation();
  }, [getDeviceCurrentLocation]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Header>
        <RoundButton
          theme={isDarkMode ? 'dark' : 'light'}
          iconName="menu"
          borderRadius={16}
          onPress={() => {
            // @TODO: Add menu
          }}
        />
        <SearchInput
          theme={isDarkMode ? 'dark' : 'light'}
          cityName={weatherData?.name}
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
        {/* <RoundButton
          theme={isDarkMode ? 'dark' : 'light'}
          iconName="crosshair"
          onPress={() => {
            getDeviceCurrentLocation();
          }}
        /> */}
        <RoundButton
          theme={isDarkMode ? 'dark' : 'light'}
          iconName="reload"
          onPress={() => {
            handleMapLocationChange(latitude, longitude);
          }}
        />
      </Header>
      <MapView
        theme={isDarkMode ? 'dark' : 'light'}
        latitude={latitude}
        longitude={longitude}
        onChangeLocation={handleMapLocationChange}
      />
      {weatherData ? (
        <WeatherWidget
          theme={isDarkMode ? 'dark' : 'light'}
          currentTime={getDayAndNightTheme(
            weatherData.dt,
            weatherData.sys.sunrise,
            weatherData.sys.sunset,
          )}
          weatherCode={weatherData?.weather?.[0]?.id}
          cityName={weatherData?.name}
          temperature={weatherData?.main?.temp}
          description={weatherData?.weather?.[0]?.description}
          humidity={weatherData?.main?.humidity}
          wind={weatherData?.wind?.speed}
          visibility={weatherData?.visibility}
        />
      ) : null}
    </SafeAreaView>
  );
}
