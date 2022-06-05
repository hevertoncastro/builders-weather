import React from 'react';
import {SearchInputHolder, IconImage, SearchText} from './styles';

interface SearchInputProps {
  theme: 'dark' | 'light';
  cityName: string;
  onPress: () => void;
}

export default function ({
  theme = 'light',
  cityName,
  onPress,
}: SearchInputProps) {
  return (
    <SearchInputHolder theme={theme} onPress={onPress}>
      <IconImage
        resizeMode="center"
        source={require('@assets/icons/location.png')}
      />
      <SearchText theme={theme}>{cityName}</SearchText>
    </SearchInputHolder>
  );
}
