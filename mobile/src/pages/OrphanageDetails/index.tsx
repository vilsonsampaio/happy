import React, { useEffect, useState } from 'react';
import { ScrollView, Linking } from 'react-native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Loading from '../../components/Loading';

import mapMarkerImg from '../../images/map-marker.png';

import formatPhoneNumber from '../../utils/formatPhoneNumber';

import api from '../../services/api';

import {
  Container,
  ImagesContainer,
  Image,
  DetailsContainer,
  Title,
  Description,
  MapContainer,
  Map,
  RoutesContainer,
  RoutesText,
  Separator,
  ScheduleContainer,
  ScheduleItem,
  ScheduleText,
  ContactButton,
  ContactButtonText,
} from './styles';

interface OrphanageDetailsRouteParams {
  id: number;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  whatsapp: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

const OrphanageDetails: React.FC = () => {
  const routes = useRoute();
  const params = routes.params as OrphanageDetailsRouteParams;
  const theme = useTheme();

  const [orphanage, setOrphanage] = useState<Orphanage>();

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  function handleOpenGoogleMapsRoutes() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`
    );
  }

  function handleOpenWhatsApp(phone: string) {
    const formatedNumber = formatPhoneNumber(phone);

    Linking.canOpenURL('whatsapp://send?text=oi').then((supported) => {
      if (supported) {
        return Linking.openURL(`whatsapp://send?phone=${formatedNumber}`);
      } else {
        return Linking.openURL(
          `https://api.whatsapp.com/send?phone=${formatedNumber}`
        );
      }
    });
  }

  if (!orphanage) {
    return <Loading />;
  }

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map((image) => {
            return <Image key={image.id} source={{ uri: image.url }} />;
          })}
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>{orphanage.name}</Title>
        <Description>{orphanage.about}</Description>

        <MapContainer>
          <Map
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </Map>

          <RoutesContainer onPress={handleOpenGoogleMapsRoutes}>
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <ScheduleContainer>
          <ScheduleItem variant="info">
            <Feather name="clock" size={40} color={theme.colors.primaryDark} />
            <ScheduleText variant="info">
              Segunda à Sexta {orphanage.opening_hours}
            </ScheduleText>
          </ScheduleItem>

          {orphanage.open_on_weekends ? (
            <ScheduleItem variant="opened">
              <Feather name="info" size={40} color={theme.colors.success} />
              <ScheduleText variant="opened">
                Atendemos fim de semana
              </ScheduleText>
            </ScheduleItem>
          ) : (
            <ScheduleItem variant="closed">
              <Feather name="info" size={40} color={theme.colors.error} />
              <ScheduleText variant="closed">
                Não atendemos fim de semana
              </ScheduleText>
            </ScheduleItem>
          )}
        </ScheduleContainer>

        <ContactButton
          onPress={() => handleOpenWhatsApp(orphanage.whatsapp)}
        >
          <FontAwesome name="whatsapp" size={24} color={theme.colors.textInButton} />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton>
      </DetailsContainer>
    </Container>
  );
};

export default OrphanageDetails;
