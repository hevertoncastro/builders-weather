import styled from 'styled-components/native';
import {grey600, primary, white} from '@constants/colors';

interface SelectProps {
  theme: 'dark' | 'light';
}

export const SelectHolder = styled.View`
  padding: 24px 0;
`;

export const ArrowIconImage = styled.Image`
  width: 16px;
  height: 16px;
`;

export const SelectLabel = styled.Text<SelectProps>`
  color: ${primary};
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  ${({theme}) => (theme === 'dark' ? `color: ${white};` : `color: ${grey600};`)}
`;
