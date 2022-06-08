import React from 'react';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';
import RoundButton from '@components/RoundButton';
import {useUserColorScheme} from '@hooks/useUserColorScheme';
import {SearchContainer, SearchHeaderTitle} from './styles';
import Header from '@components/Header';
import constants from '@constants/index';
import {RootState} from '~types/store';
import {black, grey700, info, white} from '@constants/colors';

export default function ({navigation}) {
  const {colorScheme, isDarkMode} = useUserColorScheme();
  const language =
    useSelector((state: RootState) => state.settings.language) || 'pt_br';

  return (
    <SearchContainer theme={colorScheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header justify="flex-start">
        <RoundButton
          theme={isDarkMode ? 'dark' : 'light'}
          iconName="back"
          borderRadius={12}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <SearchHeaderTitle>
          {constants.TEXTS[language].SEARCH_TITLE}
        </SearchHeaderTitle>
      </Header>
      <GooglePlacesAutocomplete
        placeholder={constants.TEXTS[language].SEARCH_PLACEHOLDER}
        textInputProps={{
          autoFocus: true,
        }}
        styles={{
          container: {
            width: '90%',
            alignSelf: 'center',
            maxHeight: '68%',
          },
          textInput: {
            marginTop: 24,
            height: 48,
            color: isDarkMode ? white : black,
            backgroundColor: isDarkMode ? grey700 : white,
          },
          predefinedPlacesDescription: {
            color: info,
          },
          row: {
            backgroundColor: isDarkMode ? grey700 : white,
          },
          description: {
            color: isDarkMode ? white : black,
          },
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
        minLength={3}
        onPress={(data, details = null) => {
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
