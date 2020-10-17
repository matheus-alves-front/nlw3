import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OrphnagesMap from './pages/OrphnagesMap'
import OrphnagesDetails from './pages/OrphnageDetails'
import SelectMapPosition from './pages/CreateOrphnage/SelectMapPosition'
import OrphnageData from './pages/CreateOrphnage/OrphanageData'
import Header from './components/Header';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'} }}>
                <Screen name="OrphnagesMap" component={OrphnagesMap} />
                <Screen 
                    name="OrphnagesDetails" 
                    component={OrphnagesDetails} 
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Loja"/>
                    }}
                />
                <Screen name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione No Mapa"/>
                    }}    
                />
                <Screen name="OrphnageData" component={OrphnageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}