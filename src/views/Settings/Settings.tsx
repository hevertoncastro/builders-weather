import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StatusBar} from 'react-native';
import {setLanguage, setThemes, setUnits} from '@redux/actions/settings';
import RoundButton from '@components/RoundButton';
import {SearchContainer, SearchHeaderTitle} from './styles';
import Select from '@components/Select';
import Header from '@components/Header';
import {useUserColorScheme} from '@hooks/useUserColorScheme';
import constants from '@constants/index';
import {RootState} from '~types/store';
import {LanguagesType, ThemeType, UnitsType} from '~types/settings';

const languages = [
  {label: '🇧🇷  Português', value: 'pt_br'},
  {label: '🇬🇧  English', value: 'en'},
  {label: '🇪🇸  Espanhol', value: 'es'},
  {label: '🇺🇦  Ukrainian', value: 'ua'},
  {label: '🇨🇳  Chinese', value: 'zh_cn'},
];

const units = [
  {label: 'Métrica', value: 'metric'},
  {label: 'Imperial', value: 'imperial'},
];

const themes = [
  {label: 'Light', value: 'light'},
  {label: 'Dark', value: 'dark'},
  {label: 'System', value: 'system'},
];

export default function ({navigation}) {
  const {colorScheme, isDarkMode} = useUserColorScheme();
  const language =
    useSelector((state: RootState) => state.settings.language) || 'pt_br';
  const unit =
    useSelector((state: RootState) => state.settings.units) || 'metric';
  const theme =
    useSelector((state: RootState) => state.settings.theme) || 'system';
  const dispatch = useDispatch();

  return (
    <SearchContainer theme={isDarkMode ? 'dark' : 'light'}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Header justify="flex-start">
        <RoundButton
          theme={isDarkMode ? 'dark' : 'light'}
          iconName="back"
          borderRadius={12}
          onPress={() => {
            navigation.navigate('Home', {
              from: 'Settings',
            });
          }}
        />
        <SearchHeaderTitle>
          {constants.TEXTS[language].SETTINGS_TITLE}
        </SearchHeaderTitle>
      </Header>
      <Select
        theme={colorScheme}
        label={`🌎 ${constants.TEXTS[language].SETTINGS_LANGUAGE_LABEL}`}
        placeholder={languages.find(l => l.value === language)?.label}
        items={languages.map(l => l.label)}
        onSelect={(selectedItem, index) => {
          dispatch(setLanguage(languages[index].value as LanguagesType) as any);
        }}
      />
      <Select
        theme={colorScheme}
        label={`📏 ${constants.TEXTS[language].SETTINGS_UNITS_LABEL}`}
        placeholder={constants.TEXTS[language][unit]}
        items={units.map(t => {
          return constants.TEXTS[language][t?.value] ?? t?.label;
        })}
        onSelect={(selectedItem, index) => {
          dispatch(setUnits(units[index].value as UnitsType) as any);
        }}
      />

      <Select
        theme={colorScheme}
        label={`🎨 ${constants.TEXTS[language].SETTINGS_THEME_LABEL}`}
        placeholder={constants.TEXTS[language][theme]}
        items={themes.map(t => {
          return constants.TEXTS[language][t?.value] ?? t?.label;
        })}
        onSelect={(selectedItem, index) => {
          dispatch(setThemes(themes[index].value as ThemeType) as any);
        }}
      />
    </SearchContainer>
  );
}
