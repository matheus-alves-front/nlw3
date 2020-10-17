import React, {  useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-maker.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphnage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphnagesMap() {
  const [orphnages, setOrphnages] = useState<Orphnage[]>([]);
  const navigation = useNavigation();  
  
  useFocusEffect(() => {
    api.get('/orphnages').then(response => {
      setOrphnages(response.data);
    })
  })

  function handleNavigateOrphnageDetails(id: number) {
      navigation.navigate('OrphnagesDetails', { id });
  }

  function handleNavigateToCreateOrphnage() {
    navigation.navigate('SelectMapPosition');
}

    return (
      <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -22.4829741,
          longitude: -44.4734657,
          latitudeDelta: 0.008,
          longitudeDelta : 0.008,
        }} 
      >
        
        {orphnages.map(orphnage => {
          return (
            <Marker 
              key={orphnage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphnage.latitude,
                longitude: orphnage.longitude,
              }}
            >
          <Callout tooltip onPress={() => handleNavigateOrphnageDetails(orphnage.id)}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{orphnage.name}</Text>
            </View>
          </Callout>
        </Marker>
          )
        })}

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphnages.length} orfanatos encontrados</Text>

        <RectButton style={styles.createOrphnageButton} onPress={handleNavigateToCreateOrphnage} >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
  
      elevation: 5,
    },
  
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 10,
    },
  
    footerText: {
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold',
    },
  
    createOrphnageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  