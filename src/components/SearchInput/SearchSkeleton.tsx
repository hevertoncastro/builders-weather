import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {grey200, grey550, grey650, white} from '@constants/colors';

interface SearchSkeletonProps {
  theme?: 'dark' | 'light';
}

export default function ({theme = 'light'}: SearchSkeletonProps) {
  return (
    <ContentLoader
      speed={0.9}
      width={100}
      height={38}
      opacity={theme === 'dark' ? 0.5 : 0.8}
      viewBox="0 0 260 38"
      backgroundColor={theme === 'dark' ? grey650 : grey200}
      foregroundColor={theme === 'dark' ? grey550 : white}>
      <Rect x="16" y="0" rx="12" ry="12" width="220" height="38" />
    </ContentLoader>
  );
}
