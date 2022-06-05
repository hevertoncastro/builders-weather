import React, {PropsWithChildren} from 'react';
import {CustomHeaderWrapper} from './styles';

export default function ({children}: PropsWithChildren<any>) {
  return <CustomHeaderWrapper>{children}</CustomHeaderWrapper>;
}
