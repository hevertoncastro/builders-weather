import React, {PropsWithChildren} from 'react';
import {CustomHeaderWrapper} from './styles';

interface HeaderProps extends PropsWithChildren<any> {
  justify?: 'space-between' | 'center' | 'flex-start';
  absolute?: boolean;
}

export default function ({
  justify = 'space-between',
  absolute = false,
  children,
}: HeaderProps) {
  return (
    <CustomHeaderWrapper justify={justify} absolute={absolute}>
      {children}
    </CustomHeaderWrapper>
  );
}
