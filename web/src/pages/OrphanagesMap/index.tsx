import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { mapIcon } from '../../utils';

import api from '../../services/api';

import { MapMarker } from '../../assets/images';

import { Container, Sidebar, GoToOrphanageDetail, CreateOrphanage } from './styles';

// Only information that will be used on this screen.
interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [userPosition, setUserPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    api
      .get('orphanages')
      .then((response) => {
        setOrphanages(response.data);
      })
      .catch(error => {
        console.error(error);

        toast.error('Não foi possível pegar dados dos orfanatos.')
      })
    ;

    navigator
      .geolocation
      .getCurrentPosition(
        (position) => {
          const {  latitude, longitude } = position.coords;

          setUserPosition([latitude, longitude]);
        },
        (error) => {
          console.error(error);

          toast.error('Não foi possível pegar a localização!');
        }
      )
    ;
  }, []);

  return (
    <Container>
      <Sidebar>
        <header>
          <Link to="/">
            <MapMarker />
          </Link>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Camaçari</strong>
          <span>Bahia</span>
        </footer>
      </Sidebar>

      <Map
        center={userPosition}
        zoom={15}
        className="map-container"
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={200}
                maxWidth={200}
                className="map-popup"
              >
                {orphanage.name}
                <GoToOrphanageDetail to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight />
                </GoToOrphanageDetail>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <CreateOrphanage to="/orphanages/create">
        <FiPlus />
      </CreateOrphanage>
    </Container>
  );
};

export default OrphanagesMap;
