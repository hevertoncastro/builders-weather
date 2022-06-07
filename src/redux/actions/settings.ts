import {Dispatch} from 'react';
import {Action} from '@redux/reducers/settings';
import {LanguagesType, UnitsType} from '~types/settings';

// Action types
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_UNITS = 'SET_UNITS';

export const setLanguage = (language: LanguagesType) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: SET_LANGUAGE,
      payload: language,
    });
  };
};

export const setUnits = (language: UnitsType) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: SET_UNITS,
      payload: language,
    });
  };
};
