import React from 'react';
import SearchSkeleton from './SearchSkeleton';
import {SearchInputHolder, IconImage, SearchText} from './styles';

interface SearchInputProps {
  theme: 'dark' | 'light';
  cityName: string;
  loading: boolean;
  onPress: () => void;
}

export default function ({
  theme = 'light',
  cityName,
  loading,
  onPress,
}: SearchInputProps) {
  return (
    <SearchInputHolder theme={theme} onPress={onPress}>
      <IconImage
        resizeMode="center"
        source={require('@assets/icons/location.png')}
      />
      {loading ? (
        <SearchSkeleton theme={theme} />
      ) : (
        <SearchText theme={theme}>{cityName}</SearchText>
      )}
    </SearchInputHolder>
  );
}
