import React from 'react';
import {RoundButtonHolder, IconImage} from './styles';

interface RoundButtonProps {
  theme: 'dark' | 'light';
  iconName?: 'menu' | 'crosshair' | 'reload' | 'back';
  onPress: () => void;
  borderRadius?: number;
}

export default function ({
  theme = 'light',
  iconName = 'menu',
  onPress,
  borderRadius,
}: RoundButtonProps) {
  return (
    <RoundButtonHolder
      theme={theme}
      borderRadius={borderRadius}
      onPress={onPress}>
      {iconName === 'menu' ? (
        <IconImage
          resizeMode="center"
          source={require('@assets/icons/menu.png')}
        />
      ) : null}
      {iconName === 'crosshair' ? (
        <IconImage
          resizeMode="center"
          source={require('@assets/icons/crosshair.png')}
        />
      ) : null}
      {iconName === 'reload' ? (
        <IconImage
          resizeMode="center"
          source={require('@assets/icons/reload.png')}
        />
      ) : null}
      {iconName === 'back' ? (
        <IconImage
          resizeMode="center"
          source={require('@assets/icons/back.png')}
        />
      ) : null}
    </RoundButtonHolder>
  );
}
