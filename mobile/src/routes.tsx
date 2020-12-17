import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';

import Header from './components/Header';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.shapesPrimary,
        },
      }}
    >
      <Stack.Screen 
        name="OrphanagesMap" 
        component={OrphanagesMap} 
      />

      <Stack.Screen
        name="OrphanageDetails"
        component={OrphanageDetails}
        options={{
          headerShown: true,
          header: () => <Header showCancel={false} title="Orfanato" />,
        }}
      />

      <Stack.Screen
        name="SelectMapPosition"
        component={SelectMapPosition}
        options={{
          headerShown: true,
          header: () => <Header title="Selecione no mapa" />,
        }}
      />

      <Stack.Screen
        name="OrphanageData"
        component={OrphanageData}
        options={{
          headerShown: true,
          header: () => <Header title="Informe os dados" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
