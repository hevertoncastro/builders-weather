import styled from 'styled-components/native';
import {grey200, grey800} from '@constants/colors';

interface SettingsProps {
  theme: 'dark' | 'light';
}

export const SettingsContainer = styled.View<SettingsProps>`
  flex: 1;
  width: 100%;
  background-color: ${grey200};
  ${({theme}) =>
    theme === 'dark'
      ? `background-color: ${grey800};`
      : `background-color: ${grey200};`}
`;
