import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiClock, FiInfo } from 'react-icons/fi';

import { WhatsApp } from '../../assets/images';

import Sidebar from '../../components/Sidebar';
import PageHeader from '../../components/PageHeader';

import { mapIcon, formatPhoneNumber } from '../../utils';

import api from '../../services/api';

import {
  Container,
  Main,
  OrphanageDetail,
  OrphanageDetailContent,
  Images,
  ImageButton,
  MapContainer,
  Cards,
  HourCard,
  OpenOnWeekendsCard,
  WhatsAppButton,
} from './styles';

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  whatsapp: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

const Orphanage: React.FC = () => {
  const params = useParams<OrphanageParams>();

  const history = useHistory();

  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    api
      .get(`orphanages/${params.id}`)
      .then((response) => {
        setOrphanage(response.data);
      })
      .catch(async (error) => {
        console.error(error);

        toast.error('Não foi possível encontrar este orfanato.');

        history.push('/');
      });
  }, [params.id, history]);


  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Sidebar />

      <Main>
        <PageHeader title={orphanage.name} />

        <OrphanageDetail>
          <img src={orphanage.images[activeImage].url} alt={orphanage.name} />

          <OrphanageDetailContent>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <Images>
              {orphanage.images.map((image, index) => {
                return (
                  <ImageButton
                    key={image.id}
                    type="button"
                    isActive={activeImage === index}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image.url} alt={orphanage.name} />
                  </ImageButton>
                );
              })}
            </Images>

            <MapContainer>
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  target="_blank"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </MapContainer>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <Cards>
              <HourCard>
                <FiClock />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </HourCard>

              <OpenOnWeekendsCard isOpen={orphanage.open_on_weekends}>
                <FiInfo />
                {orphanage.open_on_weekends ? 'Atendemos' : 'Não atendemos'}
                <br />
                fim de semana
              </OpenOnWeekendsCard>
            </Cards>

            <WhatsAppButton
              rel="noopener noreferrer"
              href={`http://wa.me/${formatPhoneNumber(orphanage.whatsapp)}`}
              target="_blank"
            >
              <WhatsApp />
              Entrar em contato
            </WhatsAppButton>
          </OrphanageDetailContent>
        </OrphanageDetail>
      </Main>
    </Container>
  );
};

export default Orphanage;
