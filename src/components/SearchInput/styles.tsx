import styled from 'styled-components/native';
import {grey700, grey800, white} from '../../constants/colors';

interface SearchInputProps {
  theme: 'dark' | 'light';
}

export const SearchInputHolder = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<SearchInputProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px;
  height: 48px;
  margin: 0 12px;
  border-radius: 16px;
  background-color: white;
  ${({theme}) =>
    theme === 'dark'
      ? `background-color: ${grey700};`
      : `background-color: ${white};`}
`;

export const IconImage = styled.Image`
  width: 16px;
  height: 16px;
`;

export const SearchText = styled.Text<SearchInputProps>`
  color: ${white};
  font-size: 14px;
  margin-left: 8px;
  ${({theme}) => (theme === 'dark' ? `color: ${white};` : `color: ${grey800};`)}
`;
