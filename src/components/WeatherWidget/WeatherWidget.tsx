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
} from './styles';

interface WeatherWidgetProps {
  humidity: string;
  wind: string;
  visibility: string;
}

export default function ({humidity, wind, visibility}: WeatherWidgetProps) {
  return (
    <WeatherWidgetWrapper>
      <MainInfo>
        <WeatherIcon iconCode={301} theme="day" />
        <Temperature>29º</Temperature>
      </MainInfo>

      <AsideInfo>
        <AsideInfoHolder>
          <AsideInfoIcon
            resizeMode="center"
            source={require('@assets/icons/humidity.png')}
          />
          <AsideInfoTitle>{humidity}</AsideInfoTitle>
          <AsideInfoDescription>Humidity</AsideInfoDescription>
        </AsideInfoHolder>
        <AsideInfoHolder>
          <AsideInfoIcon
            resizeMode="center"
            source={require('@assets/icons/wind.png')}
          />
          <AsideInfoTitle>{wind}</AsideInfoTitle>
          <AsideInfoDescription>Wind</AsideInfoDescription>
        </AsideInfoHolder>
        <AsideInfoHolder>
          <AsideInfoIcon
            resizeMode="center"
            source={require('@assets/icons/visibility.png')}
          />
          <AsideInfoTitle>{visibility}</AsideInfoTitle>
          <AsideInfoDescription>Visibility</AsideInfoDescription>
        </AsideInfoHolder>
      </AsideInfo>
    </WeatherWidgetWrapper>
  );
}
