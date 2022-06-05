import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import Header from '../../components/Header';
import RoundButton from '../../components/RoundButton';
import {SearchContainer} from './styles';

export default function ({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SearchContainer theme={isDarkMode ? 'dark' : 'light'}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Header>
        <RoundButton
          theme={isDarkMode ? 'dark' : 'light'}
          iconName="back"
          borderRadius={12}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Header>
      <GooglePlacesAutocomplete
        placeholder="Search"
        textInputProps={{
          autoFocus: true,
        }}
        styles={{
          container: {
            width: '90%',
            alignSelf: 'center',
          },
          textInput: {
            marginTop: 96,
            height: 48,
            color: isDarkMode ? '#ffffff' : '#000000',
            backgroundColor: isDarkMode ? '#2e3041' : '#ffffff',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          row: {
            backgroundColor: isDarkMode ? '#2e3041' : '#ffffff',
          },
          description: {
            color: isDarkMode ? '#ffffff' : '#000000',
          },
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(details?.geometry?.location);
          if (details?.geometry?.location) {
            navigation.navigate('Home', {
              latitude: details?.geometry?.location?.lat,
              longitude: details?.geometry?.location?.lng,
            });
          }
        }}
        query={{
          key: 'AIzaSyBED9sj0n2PNbeeNEm87UqAhe7D4IhbeYA',
          language: 'pt_BR',
        }}
      />
    </SearchContainer>
  );
}
