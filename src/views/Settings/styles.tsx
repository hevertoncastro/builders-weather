import styled from 'styled-components/native';
import {grey200, grey800} from '@constants/colors';
import {primary} from '../../constants/colors';

interface SearchProps {
  theme: 'dark' | 'light';
}

export const SearchContainer = styled.SafeAreaView<SearchProps>`
  flex: 1;
  width: 100%;
  background-color: ${grey200};
  align-items: center;
  ${({theme}) =>
    theme === 'dark'
      ? `background-color: ${grey800};`
      : `background-color: ${grey200};`}
`;

export const SearchHeaderTitle = styled.Text`
  color: ${primary};
  font-size: 20px;
  margin-left: 16px;
`;
