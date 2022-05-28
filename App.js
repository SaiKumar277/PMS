import React from 'react';
import Providers from './navigation';

import AppLoading from 'expo-app-loading';
import { useFonts } from "@use-expo/font";
const customFonts = {
  'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
};

export default function App() {
  const [isLoaded] = useFonts(customFonts);
  if (!isLoaded) {
      return <AppLoading />;
  }
  return <Providers />;
}