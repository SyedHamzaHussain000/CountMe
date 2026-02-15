import 'react-native-get-random-values';
import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/Routes';
import Toast from 'react-native-toast-message';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store/Store';

import { PersistGate } from 'redux-persist/integration/react';






const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>

            <Routes />
            <Toast />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
