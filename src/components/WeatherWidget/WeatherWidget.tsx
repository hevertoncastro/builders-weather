import React from 'react';
import {Animated} from 'react-native';
import {useSelector} from 'react-redux';
import {useBounceAnimation} from '@hooks/useBounceAnimation';
import {grey1000, grey700, info, primary} from '@constants/colors';
import WeatherIcon from '../WeatherIcon';
import {RootState} from '~types/store';
import Config from 'react-native-config';
import constants from '@constants/index';
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
  const language =
    useSelector((state: RootState) => state.settings.language) || 'pt_br';

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
            <AsideInfoDescription>
              {constants.TEXTS[language].HUMIDITY}
            </AsideInfoDescription>
          </AsideInfoHolder>
        ) : null}
        {wind ? (
          <AsideInfoHolder>
            <AsideInfoIcon
              resizeMode="center"
              source={require('@assets/icons/wind.png')}
            />
            <AsideInfoTitle>{wind}m/s</AsideInfoTitle>
            <AsideInfoDescription>
              {constants.TEXTS[language].WIND}
            </AsideInfoDescription>
          </AsideInfoHolder>
        ) : null}
        {visibility ? (
          <AsideInfoHolder>
            <AsideInfoIcon
              resizeMode="center"
              source={require('@assets/icons/visibility.png')}
            />
            <AsideInfoTitle>{Math.round(visibility / 1000)}km</AsideInfoTitle>
            <AsideInfoDescription>
              {constants.TEXTS[language].VISIBILITY}
            </AsideInfoDescription>
          </AsideInfoHolder>
        ) : null}
      </AsideInfo>
    </WeatherWidgetWrapper>
  );
}
