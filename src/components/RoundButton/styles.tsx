import styled from 'styled-components/native';
import {grey700, white} from '../../constants/colors';

interface RoundButtonProps {
  theme: 'dark' | 'light';
  borderRadius?: number;
}

export const RoundButtonHolder = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<RoundButtonProps>`
  align-items: center;
  justify-content: center;
  padding: 8px;

  ${({theme}) =>
    theme === 'dark'
      ? `background-color: ${grey700};`
      : `background-color: ${white};`}

  width: 48px;
  height: 48px;
  ${({borderRadius}) =>
    borderRadius ? `border-radius: ${borderRadius}px;` : 'border-radius: 24px;'}
`;

export const IconImage = styled.Image`
  width: 20px;
  height: 20px;
`;
