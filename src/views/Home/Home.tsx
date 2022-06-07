import React, {useCallback, useEffect, useState} from 'react';
import {
  StatusBar,
  PermissionsAndroid,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import Config from 'react-native-config';
// import {useFocusEffect} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import MapView from '@components/MapView';
import WeatherWidget from '@components/WeatherWidget';
import RoundButton from '@components/RoundButton';
import Header from '@components/Header';
import SearchInput from '@components/SearchInput';
import {useUserColorScheme} from '@hooks/useUserColorScheme';
import {WeatherApiResponseType} from '@types/weather';
import constants from '@constants/index';
import {RootState} from '~types/store';
import {HomeContainer} from './styles';

export default function ({navigation, route}) {
  const {params}: any = route;
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData]: WeatherApiResponseType | undefined =
    useState(undefined);
  const {colorScheme, isDarkMode} = useUserColorScheme();
  const language =
    useSelector((state: RootState) => state.settings.language) || 'pt_br';
  const units =
    useSelector((state: RootState) => state.settings.units) || 'metric';

  // @TODO: Separate to a util
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

  // @TODO: Separate to a util
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

  // @TODO: Separate to a util
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
        setLatitude(constants.INITIAL_LATITUDE);
        setLongitude(constants.INITIAL_LONGITUDE);
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

  // @TODO: Separate to a util
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
  const getWeatherData = useCallback(
    async (currentLatitude: number, currentLongitude: number) => {
      return await fetch(
        constants.WEATHER_API_BASE_URL(
          currentLatitude,
          currentLongitude,
          units,
          language,
          `${Config.WEATHER_API_KEY}`,
        ),
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log('weather', data.name);
          // console.log('weather', JSON.stringify(data, null, 2));
          return data;
        });
    },
    [language, units],
  );

  const handleMapLocationChange = useCallback(
    async (
      newLatitude: number,
      newLongitude: number,
      isGesture: boolean | undefined,
    ) => {
      const weatherResponse: WeatherApiResponseType = await getWeatherData(
        newLatitude,
        newLongitude,
      );
      if (weatherResponse) {
        setWeatherData(weatherResponse);
      }
      console.log('isGesture', isGesture);
    },
    [getWeatherData],
  );

  useEffect(() => {
    if (params?.latitude && params?.longitude) {
      setLatitude(params?.latitude);
      setLongitude(params?.longitude);
    }
    if (params?.from === 'Settings') {
      handleMapLocationChange(latitude, longitude, false);
    }
  }, [params, handleMapLocationChange, latitude, longitude]);

  useEffect(() => {
    // @TODO: Redundant code
    getDeviceCurrentLocation();
  }, [getDeviceCurrentLocation]);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('useFocusEffect');
  //     return () => {
  //       console.log('useFocusEffect clear');
  //     };
  //   }, []),
  // );

  return (
    <HomeContainer>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Header absolute>
        <RoundButton
          theme={colorScheme}
          iconName="menu"
          borderRadius={16}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
        <SearchInput
          theme={colorScheme}
          cityName={weatherData?.name}
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
        {/* <RoundButton
          theme={colorScheme}
          iconName="crosshair"
          onPress={() => {
            getDeviceCurrentLocation();
          }}
        /> */}
        <RoundButton
          theme={colorScheme}
          iconName="reload"
          onPress={() => {
            handleMapLocationChange(latitude, longitude, false);
          }}
        />
      </Header>
      <MapView
        theme={colorScheme}
        latitude={latitude}
        longitude={longitude}
        onChangeLocation={handleMapLocationChange}
      />
      {weatherData ? (
        <WeatherWidget
          theme={colorScheme}
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
    </HomeContainer>
  );
}
