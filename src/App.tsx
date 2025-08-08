import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/Routes';
import Toast from 'react-native-toast-message';

import { Provider } from 'react-redux'
import { store } from './redux/store/Store';

const App = () => {
  return (
      <Provider store={store}>
    <NavigationContainer>
      <Routes />
      <Toast/>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
