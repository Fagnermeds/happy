import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import OrphanageDetails from './pages/OrphanageDetails';

import Header from './components/Header';
import HeaderCloseButton from './components/HeaderCloseButton';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerBackTitle: 'Voltar',
          headerTitleStyle: {
            color: '#8fa7b3',
          },
          headerTintColor: '#0089a5',
          // headerBackTitleStyle: {
          //   color: '#0089a5'
          // }
        }}
      >
        <AppStack.Screen 
          name='Home' 
          component={Home}
          options={{
            headerShown: false,
          }} 
        />
        <AppStack.Screen 
          name='SelectMapPosition' 
          component={SelectMapPosition}
          options={{
            headerTitle: 'Selecione no mapa',
            headerRight: () => <HeaderCloseButton />,
          }} 
        />
        <AppStack.Screen 
          name='OrphanageData' 
          component={OrphanageData} 
          options={{
            headerTitle: 'Informe os dados',
            headerRight: () => <HeaderCloseButton />,
          }}
        />
        <AppStack.Screen 
          name='OrphanageDetails' 
          component={OrphanageDetails} 
          options={{
            headerTitle: 'Orfanato',
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;