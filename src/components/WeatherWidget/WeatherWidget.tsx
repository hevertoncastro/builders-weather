import React from 'react';
import {Animated} from 'react-native';
import {useSelector} from 'react-redux';
import WeatherSkeletons from './WeatherSkeletons';
import {useBounceAnimation} from '@hooks/useBounceAnimation';
import {grey1000, grey700, info, primary} from '@constants/colors';
import WeatherIcon from '../WeatherIcon';
import {RootState} from '~types/store';
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
  loading?: boolean;
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
  loading = false,
}: WeatherWidgetProps) {
  const verticalVal = useBounceAnimation();
  const language =
    useSelector((state: RootState) => state.settings.language) || 'pt_br';
  const unit =
    useSelector((state: RootState) => state.settings.units) || 'metric';
  return (
    <WeatherWidgetWrapper
      colors={theme === 'dark' ? [grey700, grey1000] : [info, primary]}>
      <MainInfo>
        {loading ? (
          <MainInfoIcon>
            <WeatherSkeletons theme={theme} type="icon" />
          </MainInfoIcon>
        ) : (
          <Animated.View
            style={{
              transform: [{translateY: verticalVal}],
            }}>
            <MainInfoIcon>
              <WeatherIcon iconCode={weatherCode} theme={currentTime} />
            </MainInfoIcon>
          </Animated.View>
        )}

        <MainInfoTexts>
          {loading ? (
            <WeatherSkeletons theme={theme} type="main" />
          ) : (
            <>
              {cityName ? <City numberOfLines={2}>{cityName}</City> : null}
              <Temperature>{Math.round(temperature)}º</Temperature>
              <Description numberOfLines={2}>{description}</Description>
            </>
          )}
        </MainInfoTexts>
      </MainInfo>

      <AsideInfo>
        <AsideInfoHolder>
          <AsideInfoIcon
            resizeMode="center"
            source={require('@assets/icons/humidity.png')}
          />
          {loading ? (
            <WeatherSkeletons theme={theme} type="aside" />
          ) : (
            <>
              {humidity ? <AsideInfoTitle>{humidity}%</AsideInfoTitle> : null}
              <AsideInfoDescription>
                {constants.TEXTS[language].HUMIDITY}
              </AsideInfoDescription>
            </>
          )}
        </AsideInfoHolder>

        <AsideInfoHolder>
          <AsideInfoIcon
            resizeMode="center"
            source={require('@assets/icons/wind.png')}
          />
          {loading ? (
            <WeatherSkeletons theme={theme} type="aside" />
          ) : (
            <>
              {wind ? (
                <AsideInfoTitle>
                  {wind}
                  {unit === 'metric' ? 'm/s' : 'm/h'}
                </AsideInfoTitle>
              ) : null}
              <AsideInfoDescription>
                {constants.TEXTS[language].WIND}
              </AsideInfoDescription>
            </>
          )}
        </AsideInfoHolder>

        <AsideInfoHolder>
          <AsideInfoIcon
            resizeMode="center"
            source={require('@assets/icons/visibility.png')}
          />
          {loading ? (
            <WeatherSkeletons theme={theme} type="aside" />
          ) : (
            <>
              {visibility ? (
                <AsideInfoTitle>
                  {Math.round(visibility / 1000)}km
                </AsideInfoTitle>
              ) : null}
              <AsideInfoDescription>
                {constants.TEXTS[language].VISIBILITY}
              </AsideInfoDescription>
            </>
          )}
        </AsideInfoHolder>
      </AsideInfo>
    </WeatherWidgetWrapper>
  );
}
