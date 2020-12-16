import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarkerImg from '../../../images/map-marker.png';

import { Container, Map, NextButton, NextButtonText } from './styles';

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  return (
    <Container>
      <Map
        initialRegion={{
          latitude: -12.7197249,
          longitude: -38.3271104,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        provider={PROVIDER_GOOGLE}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && position.longitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </Map>

      {position.latitude !== 0 && position.longitude !== 0 && (
        <NextButton onPress={handleNextStep}>
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      )}
    </Container>
  );
};

export default SelectMapPosition;
