import {LanguagesType, ThemeType, UnitsType} from './settings';

export type RootState = {
  settings: {
    language: LanguagesType;
    units: UnitsType;
    theme: ThemeType;
  };
};
