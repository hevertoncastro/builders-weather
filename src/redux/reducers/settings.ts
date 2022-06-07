import {SET_LANGUAGE} from '@redux/actions/settings';
import {LanguagesType, UnitsType, ThemeType} from '~types/settings';

const initialState = {
  language: 'PT_BR' as LanguagesType,
  units: 'metric' as UnitsType,
  theme: 'system' as ThemeType,
};

export type Action = {
  type: 'SET_LANGUAGE' | 'SET_UNITS' | 'SET_THEME';
  payload: LanguagesType | UnitsType | ThemeType;
};

function settingsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload as LanguagesType,
      };
    default:
      return state;
  }
}

export default settingsReducer;
