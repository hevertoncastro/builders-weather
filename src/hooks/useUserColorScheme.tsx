import {useColorScheme} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '~types/store';

export const useUserColorScheme = () => {
  const systemColorScheme = useColorScheme();
  const theme = useSelector((state: RootState) => state.settings.theme);
  const finalScheme: 'dark' | 'light' =
    theme === 'system' ? systemColorScheme ?? 'light' : theme;
  return {colorScheme: finalScheme, isDarkMode: finalScheme === 'dark'};
};
