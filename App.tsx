import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import HomeScreen from './src/screens/Home/HomeScreen';
import SafeArea from './src/components/Common/SafeArea';
import {KeyboardProvider} from './src/Context/KeyboardContext';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <KeyboardProvider>
      <SafeArea>
        <HomeScreen />
      </SafeArea>
    </KeyboardProvider>
  );
};

export default App;
