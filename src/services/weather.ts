import constants from '@constants/index';
import Config from 'react-native-config';
import {LanguagesType, UnitsType} from '~types/settings';

export const fetchWeatherData = async (
  currentLatitude: number,
  currentLongitude: number,
  units: UnitsType,
  language: LanguagesType,
) => {
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
      return data;
    });
};
