import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import MapView from '@components/MapView';
import WeatherWidget from '@components/WeatherWidget';
import RoundButton from '@components/RoundButton';
import Header from '@components/Header';
import SearchInput from '@components/SearchInput';
import {useUserColorScheme} from '@hooks/useUserColorScheme';
import {useHasLocationPermission} from '@hooks/useHasLocationPermission';
import {WeatherApiResponseType} from '~types/weather';
import constants from '@constants/index';
import {RootState} from '~types/store';
import {HomeContainer} from './styles';
import {fetchWeatherData} from '@services/weather';

export default function ({navigation, route}) {
  const hasLocationPermission = useHasLocationPermission();
  const {params}: any = route;
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData]: WeatherApiResponseType | undefined =
    useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {colorScheme, isDarkMode} = useUserColorScheme();
  const language =
    useSelector((state: RootState) => state.settings.language) || 'pt_br';
  const units =
    useSelector((state: RootState) => state.settings.units) || 'metric';

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

  const handleMapLocationChange = useCallback(
    async (newLatitude: number, newLongitude: number) => {
      setIsLoading(true);
      const weatherResponse: WeatherApiResponseType = await fetchWeatherData(
        newLatitude,
        newLongitude,
        units,
        language,
      );
      if (weatherResponse) {
        setWeatherData(weatherResponse);
        setIsLoading(false);
      }
    },
    [units, language],
  );

  useEffect(() => {
    if (params?.latitude && params?.longitude) {
      setLatitude(params?.latitude);
      setLongitude(params?.longitude);
    }
    if (params?.from === 'Settings') {
      handleMapLocationChange(latitude, longitude);
    }
  }, [params, handleMapLocationChange, latitude, longitude]);

  useEffect(() => {
    getDeviceCurrentLocation();
  }, [getDeviceCurrentLocation]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsLoading(true);
      };
    }, []),
  );

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
          cityName={isLoading ? '' : weatherData?.name}
          loading={isLoading}
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
        <RoundButton
          theme={colorScheme}
          iconName="reload"
          onPress={() => {
            handleMapLocationChange(latitude, longitude);
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
          loading={isLoading}
        />
      ) : null}
    </HomeContainer>
  );
}
