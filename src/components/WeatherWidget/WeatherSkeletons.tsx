import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {grey550, grey650, info100, info200} from '@constants/colors';

interface WeatherSkeletonsProps {
  theme?: 'dark' | 'light';
  type: 'main' | 'aside';
}

export default function ({
  theme = 'light',
  type = 'main',
}: WeatherSkeletonsProps) {
  if (type === 'main') {
    return (
      <ContentLoader
        speed={0.9}
        width={120}
        height={112}
        opacity={theme === 'dark' ? 0.5 : 1}
        viewBox="0 0 120 112"
        backgroundColor={theme === 'dark' ? grey650 : info100}
        foregroundColor={theme === 'dark' ? grey550 : info200}>
        <Rect x="0" y="0" rx="2" ry="2" width="90" height="16" />
        <Rect x="0" y="28" rx="2" ry="2" width="92" height="52" />
        <Rect x="0" y="90" rx="2" ry="2" width="80" height="16" />
      </ContentLoader>
    );
  }
  if (type === 'aside') {
    return (
      <ContentLoader
        speed={0.9}
        width={60}
        height={38}
        opacity={theme === 'dark' ? 0.5 : 1}
        viewBox="0 0 60 38"
        backgroundColor={theme === 'dark' ? grey650 : info100}
        foregroundColor={theme === 'dark' ? grey550 : info200}>
        <Rect x="0" y="5" rx="2" ry="2" width="60" height="16" />
        <Rect x="6" y="27" rx="2" ry="2" width="48" height="12" />
      </ContentLoader>
    );
  }
  return null;
}
