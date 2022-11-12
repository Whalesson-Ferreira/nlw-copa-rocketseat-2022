import { useEffect } from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { overwrite, Country } from 'country-list';

import { AuthContextProvider } from './src/contexts/AuthContext';

import { Loading } from './src/components/Loading';

import { THEME } from './src/styles/theme';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  useEffect(() => {
    const countries: Country[] = [
      {
        name: 'England',
        code: 'GB-ENG'
      },
      {
        name: 'Wales',
        code: 'GB-WLS'
      }
    ];
    overwrite(countries);
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        {
          fontsLoaded ? <Routes /> : <Loading />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
