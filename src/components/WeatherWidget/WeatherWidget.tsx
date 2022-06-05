import React, {useEffect} from 'react';
import {Animated, Easing} from 'react-native';
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
  const [verticalVal] = React.useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(verticalVal, {
      toValue: -10,
      duration: 2000,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();

    verticalVal.addListener(({value}) => {
      if (value === -10) {
        Animated.timing(verticalVal, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }).start();
      } else if (value === 0) {
        Animated.timing(verticalVal, {
          toValue: -10,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }).start();
      }
    });
  }, [verticalVal]);
  return (
    <WeatherWidgetWrapper>
      <MainInfo>
        <Animated.View
          style={{
            transform: [{translateY: verticalVal}],
          }}>
          <WeatherIcon iconCode={weatherCode} theme="day" />
        </Animated.View>
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
