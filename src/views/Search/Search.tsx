import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';
import RoundButton from '@components/RoundButton';
import {SearchContainer, SearchHeader, SearchHeaderTitle} from './styles';

export default function ({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SearchContainer theme={isDarkMode ? 'dark' : 'light'}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <SearchHeader>
        <RoundButton
          theme={isDarkMode ? 'dark' : 'light'}
          iconName="back"
          borderRadius={12}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <SearchHeaderTitle>Search new place</SearchHeaderTitle>
      </SearchHeader>
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
            marginTop: 24,
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
          key: `${Config.GOOGLE_PLACES_API_KEY}`,
          language: 'pt_BR',
        }}
      />
    </SearchContainer>
  );
}
