import React, {useEffect} from 'react';
import {Animated, Easing} from 'react-native';

export const useBounceAnimation = () => {
  const [verticalVal] = React.useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(verticalVal, {
      toValue: -10,
      duration: 2000,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();

    verticalVal.addListener(({value}) => {
      if (value === -10) {
        Animated.timing(verticalVal, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }).start();
      } else if (value === 0) {
        Animated.timing(verticalVal, {
          toValue: -10,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }).start();
      }
    });
  }, [verticalVal]);

  return verticalVal;
};
