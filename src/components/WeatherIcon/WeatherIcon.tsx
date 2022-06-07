import React from 'react';
import constants from '@constants/index';
import {LargeIcon} from './styles';

interface WeatherIconProps {
  iconCode: number;
  theme?: 'day' | 'night';
}

export default function ({iconCode = 200, theme = 'day'}: WeatherIconProps) {
  const iconSource = constants.WEATHER_ICONS[iconCode]
    ? constants.WEATHER_ICONS[iconCode]
    : constants.WEATHER_ICONS[200];

  return (
    <LargeIcon
      resizeMode="center"
      source={theme === 'day' ? iconSource?.day : iconSource?.night}
    />
  );
}
