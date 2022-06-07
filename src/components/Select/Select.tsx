import {grey400, grey50, grey700} from '@constants/colors';
import React from 'react';
import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {SelectHolder, SelectLabel, ArrowIconImage} from './styles';

interface SelectProps {
  label?: string;
  placeholder?: string;
  items: string[];
  onSelect: (selectedItem: string, index: number) => void;
  borderRadius?: number;
}

export default function ({label, placeholder, items, onSelect}: SelectProps) {
  return (
    <SelectHolder>
      {label ? <SelectLabel>{label}</SelectLabel> : null}
      <SelectDropdown
        data={items}
        onSelect={onSelect}
        defaultButtonText={placeholder ? placeholder : 'Select'}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
        buttonStyle={styles.dropdownBtnStyle}
        buttonTextStyle={styles.dropdownBtnTxtStyle}
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
        dropdownStyle={styles.dropdownDropdownStyle}
        rowStyle={styles.dropdownRowStyle}
        rowTextStyle={styles.dropdownRowTxtStyle}
      />
    </SelectHolder>
  );
}

const styles = StyleSheet.create({
  dropdownBtnStyle: {
    width: '90%',
    height: 48,
    backgroundColor: grey50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: grey400,
  },
  dropdownBtnTxtStyle: {color: grey700, textAlign: 'left', fontSize: 16},
  dropdownDropdownStyle: {
    backgroundColor: grey50,
    borderRadius: 8,
  },
  dropdownRowStyle: {backgroundColor: 'transparent'},
  dropdownRowTxtStyle: {color: grey700, textAlign: 'left', fontSize: 16},
});
