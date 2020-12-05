import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import {store, persistor} from './src/store'

import MainStackNavigator from './src/navigators/MainStackNavigator';
import { createAppContainer } from 'react-navigation';


//importar o STACK
//PRELOAD
//STARTERSTACK
//APPTAB


import styled from 'styled-components/native';

const Texto = styled.Text`
  font-size:22px;
`;

//const AppContainer = createAppContainer(MainStackNavigator);


export default()=>(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainStackNavigator/>
    </PersistGate>
  </Provider>
)
  