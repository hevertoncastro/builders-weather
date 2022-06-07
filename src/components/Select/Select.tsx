import {
  grey400,
  grey50,
  grey500,
  grey700,
  grey800,
  grey900,
} from '@constants/colors';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {SelectHolder, SelectLabel, ArrowIconImage} from './styles';

interface SelectProps {
  theme?: 'dark' | 'light';
  label?: string;
  placeholder?: string;
  items: string[];
  onSelect: (selectedItem: string, index: number) => void;
  borderRadius?: number;
}

export default function ({
  theme = 'light',
  label,
  placeholder,
  items,
  onSelect,
}: SelectProps) {
  return (
    <SelectHolder>
      {label ? <SelectLabel theme={theme}>{label}</SelectLabel> : null}
      <SelectDropdown
        data={items}
        onSelect={onSelect}
        defaultButtonText={placeholder}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
        buttonStyle={{
          width: '90%',
          height: 48,
          backgroundColor: theme === 'dark' ? grey800 : grey50,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: grey400,
        }}
        buttonTextStyle={{
          color: theme === 'dark' ? grey50 : grey500,
          textAlign: 'left',
          fontSize: 16,
        }}
        renderDropdownIcon={isOpened => {
          return isOpened ? (
            <ArrowIconImage
              resizeMode="center"
              source={require('@assets/icons/arrow-up.png')}
            />
          ) : (
            <ArrowIconImage
              resizeMode="center"
              source={require('@assets/icons/arrow-down.png')}
            />
          );
        }}
        dropdownIconPosition={'right'}
        dropdownOverlayColor="transparent"
        dropdownStyle={{
          backgroundColor: theme === 'dark' ? grey700 : grey50,
          borderRadius: 8,
        }}
        rowStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: theme === 'dark' ? grey900 : grey50,
        }}
        rowTextStyle={{
          color: theme === 'dark' ? grey50 : grey500,
          textAlign: 'left',
          fontSize: 16,
          marginLeft: 16,
        }}
      />
    </SelectHolder>
  );
}
