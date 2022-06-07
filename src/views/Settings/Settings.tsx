import React from 'react';
import {useDispatch} from 'react-redux';
import {Dimensions, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {setLanguage, setUnits} from '@redux/actions/settings';
import RoundButton from '@components/RoundButton';
import {SearchContainer, SearchHeaderTitle} from './styles';
import Select from '@components/Select';
import Header from '@components/Header';
import Config from 'react-native-config';

const languages = [
  {label: 'Português', value: 'pt_br'},
  {label: 'English', value: 'en'},
  {label: 'Espanhol', value: 'es'},
];

const units = [
  {label: 'Métrica', value: 'metric'},
  {label: 'Imperial', value: 'imperial'},
];

export default function ({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
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
            navigation.goBack();
          }}
        />
        <SearchHeaderTitle>Settings</SearchHeaderTitle>
      </Header>
      <Select
        label="Idioma"
        placeholder="Selecione o idioma"
        items={languages.map(language => language.label)}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          dispatch(setLanguage(languages[index].value));
        }}
      />
      <Select
        label="Unidade de medida"
        placeholder="Selecione a unidade"
        items={units.map(language => language.label)}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          dispatch(setUnits(units[index].value));
        }}
      />
      <Select
        label="Tema"
        placeholder="Selecione o tema"
        items={['Claro', 'Escuro', 'Sistema']}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
      />
    </SearchContainer>
  );
}
