import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';


import mapMarker from './src/images/map-marker.png';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        initialRegion={{ 
          latitude: -12.7197249, 
          longitude: -38.3271104, 
          latitudeDelta: 0.008, 
          longitudeDelta: 0.008 
        }} 
      >
        <Marker 
          icon={mapMarker}
          coordinate={{
            latitude: -12.7197249, 
            longitude: -38.3271104, 
          }}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
        >
          <Callout tooltip={true} onPress={() => { }}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar das meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>

        <TouchableOpacity style={styles.createOrphanageButton} onPress={() => {}}>
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer : {
    justifyContent: 'center',

    width: 160,
    height: 46,

    paddingHorizontal: 16,

    backgroundColor: 'rgba(255, 255, 255, 0.8)',

    borderRadius: 16,
  },

  calloutText: {
    color: '#0089A5',
    
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 34,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    height: 56,
    
    paddingLeft: 24,
    
    backgroundColor: '#FFF',

    borderRadius: 20,
  },

  footerText: {
    color: '#8FA7B2',

    fontFamily: 'Nunito_700Bold',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,

    backgroundColor: '#15C3D6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
  },
});
