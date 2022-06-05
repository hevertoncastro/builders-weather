import React from 'react';
import {RoundButtonHolder, IconImage} from './styles';

interface RoundButtonProps {
  iconName?: 'menu' | 'crosshair';
  onPress: () => void;
  borderRadius?: number;
}

export default function ({
  iconName = 'menu',
  onPress,
  borderRadius,
}: RoundButtonProps) {
  return (
    <RoundButtonHolder onPress={onPress} borderRadius={borderRadius}>
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
    </RoundButtonHolder>
  );
}
