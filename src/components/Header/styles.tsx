import styled from 'styled-components/native';

interface HeaderProps {
  theme: 'dark' | 'light';
  borderRadius?: number;
  justify: 'space-between' | 'center' | 'flex-start';
  absolute?: boolean;
}

export const CustomHeaderWrapper = styled.View<HeaderProps>`
  ${({absolute}) => absolute && 'position: absolute'}
  top: 24px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  ${({justify}) => justify && `justify-content: ${justify};`}
  width: 90%;
  height: 48px;
  margin-bottom: 24px;
  z-index: 2;
`;
