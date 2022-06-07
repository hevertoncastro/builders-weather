import React from 'react';
import {Animated} from 'react-native';
import Config from 'react-native-config';
import {useBounceAnimation} from '@hooks/useBounceAnimation';
import {grey1000, grey700, info, primary} from '@constants/colors';
import WeatherIcon from '../WeatherIcon';
import {
  WeatherWidgetWrapper,
  City,
  Temperature,
  AsideInfo,
  MainInfo,
  MainInfoIcon,
  AsideInfoIcon,
  AsideInfoTitle,
  AsideInfoDescription,
  AsideInfoHolder,
  Description,
  MainInfoTexts,
} from './styles';

interface WeatherWidgetProps {
  theme: 'dark' | 'light';
  currentTime: 'night' | 'day';
  weatherCode: number;
  cityName: string;
  temperature: number;
  description: string;
  humidity: number;
  wind: number;
  visibility: number;
}

export default function ({
  theme,
  currentTime,
  weatherCode,
  cityName,
  temperature,
  description,
  humidity,
  wind,
  visibility,
}: WeatherWidgetProps) {
  const verticalVal = useBounceAnimation();

  return (
    <WeatherWidgetWrapper
      colors={theme === 'dark' ? [grey700, grey1000] : [info, primary]}>
      <MainInfo>
        <Animated.View
          style={{
            transform: [{translateY: verticalVal}],
          }}>
          <MainInfoIcon>
            <WeatherIcon iconCode={weatherCode} theme={currentTime} />
          </MainInfoIcon>
        </Animated.View>
        <MainInfoTexts>
          <City>{Config.API_URL}</City>
          {cityName ? <City numberOfLines={1}>{cityName}</City> : null}
          <Temperature>{Math.round(temperature)}º</Temperature>
          <Description numberOfLines={2}>{description}</Description>
        </MainInfoTexts>
      </MainInfo>

      <AsideInfo>
        {humidity ? (
          <AsideInfoHolder>
            <AsideInfoIcon
              resizeMode="center"
              source={require('@assets/icons/humidity.png')}
            />
            <AsideInfoTitle>{humidity}%</AsideInfoTitle>
            <AsideInfoDescription>Humidity</AsideInfoDescription>
          </AsideInfoHolder>
        ) : null}
        {wind ? (
          <AsideInfoHolder>
            <AsideInfoIcon
              resizeMode="center"
              source={require('@assets/icons/wind.png')}
            />
            <AsideInfoTitle>{wind}m/s</AsideInfoTitle>
            <AsideInfoDescription>Wind</AsideInfoDescription>
          </AsideInfoHolder>
        ) : null}
        {visibility ? (
          <AsideInfoHolder>
            <AsideInfoIcon
              resizeMode="center"
              source={require('@assets/icons/visibility.png')}
            />
            <AsideInfoTitle>{Math.round(visibility / 1000)}km</AsideInfoTitle>
            <AsideInfoDescription>Visibility</AsideInfoDescription>
          </AsideInfoHolder>
        ) : null}
      </AsideInfo>
    </WeatherWidgetWrapper>
  );
}
