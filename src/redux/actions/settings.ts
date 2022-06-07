import {Dispatch} from 'react';
import {Action} from '@redux/reducers/settings';
import {LanguagesType} from '~types/settings';

// Action types
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setLanguage = (language: LanguagesType) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: SET_LANGUAGE,
      payload: language,
    });
  };
};
