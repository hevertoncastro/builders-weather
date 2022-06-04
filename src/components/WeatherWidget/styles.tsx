import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {info, primary, white} from '../../constants/colors';

export const WeatherWidgetWrapper = styled(LinearGradient).attrs({
  colors: [info, primary],
})`
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px 24px;
  background-color: ${primary};
`;

export const MainInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MainInfoTexts = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const Temperature = styled.Text`
  color: ${white};
  font-size: 64px;
  line-height: 64px;
`;

export const Description = styled.Text`
  color: ${white};
  font-size: 18px;
  line-height: 18px;
`;

export const LargeIcon = styled.Image`
  flex: 1;
  width: 160px;
  height: 160px;
  margin: 10px;
`;

export const AsideInfo = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin: 0 24px;
  align-items: center;
  border-top-color: ${info};
  border-top-width: 1px;
  border-style: solid;
`;

export const AsideInfoHolder = styled.View`
  justify-content: center;
  align-items: center;
  padding: 8px 0;
`;

export const AsideInfoIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const AsideInfoTitle = styled.Text`
  color: ${white};
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
`;

export const AsideInfoDescription = styled.Text`
  color: ${white};
  font-size: 12px;
`;
