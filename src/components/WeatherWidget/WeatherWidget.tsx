import React from 'react';
import WeatherIcon from '../WeatherIcon';
import {
  WeatherWidgetWrapper,
  Temperature,
  AsideInfo,
  MainInfo,
  AsideInfoIcon,
  AsideInfoTitle,
  AsideInfoDescription,
  AsideInfoHolder,
  Description,
  MainInfoTexts,
} from './styles';

interface WeatherWidgetProps {
  weatherCode: number;
  temperature: number;
  description: string;
  humidity: number;
  wind: number;
  visibility: number;
}

export default function ({
  weatherCode,
  temperature,
  description,
  humidity,
  wind,
  visibility,
}: WeatherWidgetProps) {
  return (
    <WeatherWidgetWrapper>
      <MainInfo>
        <WeatherIcon iconCode={weatherCode} theme="day" />
        <MainInfoTexts>
          <Temperature>{Math.round(temperature)}º</Temperature>
          <Description>{description}</Description>
        </MainInfoTexts>
      </MainInfo>

      <AsideInfo>
        <AsideInfoHolder>
          <AsideInfoIcon
            resizeMode="center"
            source={require('@assets/icons/humidity.png')}
          />
          <AsideInfoTitle>{humidity}%</AsideInfoTitle>
          <AsideInfoDescription>Humidity</AsideInfoDescription>
        </AsideInfoHolder>
        <AsideInfoHolder>
          <AsideInfoIcon
            resizeMode="center"
            source={require('@assets/icons/wind.png')}
          />
          <AsideInfoTitle>{wind}m/s</AsideInfoTitle>
          <AsideInfoDescription>Wind</AsideInfoDescription>
        </AsideInfoHolder>
        <AsideInfoHolder>
          <AsideInfoIcon
            resizeMode="center"
            source={require('@assets/icons/visibility.png')}
          />
          <AsideInfoTitle>{Math.round(visibility / 1000)}km</AsideInfoTitle>
          <AsideInfoDescription>Visibility</AsideInfoDescription>
        </AsideInfoHolder>
      </AsideInfo>
    </WeatherWidgetWrapper>
  );
}
