import styled from 'styled-components/native';
import {grey200, grey800} from '@constants/colors';
import {primary} from '../../constants/colors';

interface SearchProps {
  theme: 'dark' | 'light';
}

export const SearchContainer = styled.View<SearchProps>`
  flex: 1;
  width: 100%;
  background-color: ${grey200};
  align-items: center;
  ${({theme}) =>
    theme === 'dark'
      ? `background-color: ${grey800};`
      : `background-color: ${grey200};`}
`;

export const SearchHeader = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  height: 48px;
`;

export const SearchHeaderTitle = styled.Text`
  color: ${primary};
  font-size: 20px;
  margin-left: 16px;
`;
