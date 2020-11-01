import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiArrowRight, FiEdit3, FiMapPin, FiPower, FiTrash } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { mapIcon } from '../../utils';

import { MapMarker, AlertCircleNotification, NoOrphanagesIcon } from '../../assets/images';

import { Container, Siderbar, SidebarButton, Main, MainWrapper, Cards, Card, CardButton, NoOrphanages } from './styles';
import api from '../../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

type CurrentPageProps = "approved" | "pending";

let initialPage: CurrentPageProps = "approved";

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPageProps>(initialPage);

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const [pendingOrphanages, setPendingOrphanages] = useState<Orphanage[]>([]);
  const [approvedOrphanages, setApprovedOrphanages] = useState<Orphanage[]>([]);

  // Initialing
  useEffect(() => {
    // Getting approved orphanages
    api
      .get<Orphanage[]>('orphanages')
      .then(response => {
        const serializedOrphanages: Orphanage[] = response.data
          .map(orphanage => {
            return {
              id: orphanage.id,
              name: orphanage.name,
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }
          })
        ;

        setApprovedOrphanages(serializedOrphanages);
        
        if (initialPage === 'approved') {
          // Initialing the default orphanage array as the approved one's.
          setOrphanages(serializedOrphanages);
        }
      })
      .catch(error => {
        console.error(error);
      })
    ;

    // Getting pending orphanages
    // Change to axios get, when authentication is done.
    let initialPendingOrphanages = [
      { 
        id: 3, 
        name: 'Affs vidah', 
        latitude: -12.7168259, 
        longitude: -38.3282798
      },
      { 
        id: 4, 
        name: 'Criança feliz', 
        latitude: -12.7168259, 
        longitude: -38.3282798
      },
      { 
        id: 5, 
        name: 'Oi vidinha', 
        latitude: -12.7168259, 
        longitude: -38.3282798
      },
    ];

    setPendingOrphanages(initialPendingOrphanages);

    if (initialPage === 'pending') {
      // Initialing the default orphanage array as the pending one's.
      setOrphanages(initialPendingOrphanages);
    }
  }, []);

  useEffect(() => {
    if (currentPage === 'approved') {
      api
        .get<Orphanage[]>('orphanages')
        .then(response => {
          const serializedOrphanages: Orphanage[] = response.data
            .map(orphanage => {
              return {
                id: orphanage.id,
                name: orphanage.name,
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }
            })
          ;

          setApprovedOrphanages(serializedOrphanages);

          // Change the default orphanage array to the approved one's.
          setOrphanages(serializedOrphanages);
        })
        .catch(error => {
          console.error(error);
        })
      ;
    } else {
      // Change to axios get, when authentication is done.
      setPendingOrphanages((prevState) => {
        const newPendingOrphanage: Orphanage = {
          id: prevState[prevState.length -1].id * 10,
          name: prevState[0].name,
          latitude: prevState[0].latitude,
          longitude: prevState[0].longitude,
        };

        setOrphanages([...prevState, newPendingOrphanage]);

        return [...prevState, newPendingOrphanage];
      });
    }
  }, [currentPage]);
  
  return (
    <Container>
      <Siderbar>
        <MapMarker />

        <div>
          <SidebarButton 
            type="button" 
            onClick={() => setCurrentPage('approved')}
            isActive={currentPage === 'approved'}
          >
            <FiMapPin />
          </SidebarButton>

          <SidebarButton 
            type="button" 
            onClick={() => setCurrentPage('pending')}
            isActive={currentPage === 'pending'}
          >
            { currentPage === 'pending' 
              ? <FiAlertCircle />
              : (pendingOrphanages.length > 0) 
                ? <AlertCircleNotification />
                : <FiAlertCircle /> 
            }
          </SidebarButton>
        </div>

        <SidebarButton type="button">
          <FiPower />
        </SidebarButton>
      </Siderbar>

      <Main>
        <MainWrapper>
          <header>
            <h1>
              {currentPage === 'approved' 
                ? 'Orfanatos cadastrados' 
                : 'Cadastros pendentes'
              }
            </h1>
            {orphanages.length > 0 
              ? (
                <span>
                  {orphanages.length} orfanat{orphanages.length > 1 ? 'os' : 'o' }
                </span>
              )
              : ''
            }
          </header>
          
          {orphanages.length > 0
            ? (
              <Cards>
                {orphanages.map(orphanage => {
                  return (
                    <Card key={orphanage.id}>
                      <Map
                        center={[orphanage.latitude, orphanage.longitude]}
                        zoom={15}
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
                        <h2>{orphanage.name}</h2>

                        {currentPage === 'approved'
                          ? (
                            <div>
                              <CardButton to="">
                                <FiEdit3 />
                              </CardButton>

                              <CardButton to="">
                                <FiTrash />
                              </CardButton>
                            </div>
                          )
                          : (
                            <CardButton to="">
                              <FiArrowRight />
                            </CardButton>
                          )
                        }
                      </footer>
                    </Card>
                  );
                })}
              </Cards>
            )
            : (
              <NoOrphanages>
                <NoOrphanagesIcon />

                <p>Nenhum no momento</p>
              </NoOrphanages>
            )  
          }
        </MainWrapper>
      </Main>
    </Container>
  );
};

export default Dashboard;
