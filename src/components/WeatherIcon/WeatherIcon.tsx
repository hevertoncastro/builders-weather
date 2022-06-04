import React from 'react';
import {Image} from 'react-native';
import config from '../../constants/config';

interface ActionBarProps {
  iconCode: number;
  theme?: 'day' | 'night';
}

export default function ({iconCode = 200, theme = 'day'}: ActionBarProps) {
  const iconSource = config.WEATHER_ICONS[iconCode]
    ? config.WEATHER_ICONS[iconCode]
    : config.WEATHER_ICONS[200];

  return (
    <Image
      style={{
        flex: 0.5,
        width: '100%',
        height: '100%',
      }}
      resizeMode="center"
      source={theme === 'day' ? iconSource?.day : iconSource?.night}
    />
  );
}
