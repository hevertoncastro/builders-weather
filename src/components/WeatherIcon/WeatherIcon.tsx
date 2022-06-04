import React from 'react';
import config from '../../constants/config';
import {LargeIcon} from './styles';

interface WeatherIconProps {
  iconCode: number;
  theme?: 'day' | 'night';
}

export default function ({iconCode = 200, theme = 'day'}: WeatherIconProps) {
  const iconSource = config.WEATHER_ICONS[iconCode]
    ? config.WEATHER_ICONS[iconCode]
    : config.WEATHER_ICONS[200];

  return (
    <LargeIcon
      resizeMode="center"
      source={theme === 'day' ? iconSource?.day : iconSource?.night}
    />
  );
}
