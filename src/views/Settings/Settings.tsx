import React from 'react';
import {Dimensions, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Config from 'react-native-config';
import RoundButton from '@components/RoundButton';
import {SearchContainer, SearchHeaderTitle} from './styles';
import Select from '@components/Select';
import Header from '@components/Header';

export default function ({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
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
        items={['Português', 'English', 'Espanhol']}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
      />
      <Select
        label="Unidade de medida"
        placeholder="Selecione o idioma"
        items={['Métrica', 'Imperial']}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
      />
      <Select
        label="Tema"
        placeholder="Selecione o idioma"
        items={['Claro', 'Escuro', 'Sistema']}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
      />
    </SearchContainer>
  );
}
