import styled from 'styled-components/native';
import {grey600, primary} from '@constants/colors';

export const SelectHolder = styled.View`
  padding: 24px 0;
`;

export const ArrowIconImage = styled.Image`
  width: 16px;
  height: 16px;
`;

export const SelectLabel = styled.Text`
  color: ${primary};
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  color: ${grey600};
`;
