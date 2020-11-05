import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LeafletMouseEvent } from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiCheck, FiPlus, FiX, FiXCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

import PageHeader from '../../components/PageHeader';
import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';

import { mapIcon } from '../../utils';

import api from '../../services/api';

import {
  Container,
  Main,
  Form,
  Fieldset,
  MapContainer,
  ImagesContainer,
  SelectButtonContainer,
  SelectButton,
  PendingButtonContainer,
  PendingButton,
} from './styles';


interface EditOrphanageParams {
  id: string;
}

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  whatsapp: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

const EditOrphanage: React.FC = () => {
  const params = useParams<EditOrphanageParams>();
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [id, setId] = useState(0);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Getting orphanage data.
  useEffect(() => {
    const id = Number(params.id);
    
    const { search } = window.location;
    const queryParams = new URLSearchParams(search);

    const status = queryParams.get('status');

    if (!id) {
      toast.error('ID não informado!');

      history.push('/dashboard');

      return;
    }

    if (status === null) {
      toast.error('Status não informado!');

      history.push('/dashboard');
      
      return;
    }

    if (status !== "pending" && status !== "approved") {
      toast.error('Status inválido!');

      history.push('/dashboard');

      return;
    }

    setId(id);
    setStatus(status);

    if (status === "approved") {
      api
        .get<Orphanage>(`orphanages/${id}`)
        .then(response => {
          const { 
            name,
            latitude,
            longitude,
            whatsapp,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
          } = response.data;

          setPosition({ latitude, longitude });

          setName(name);
          setWhatsapp(whatsapp);
          setAbout(about);

          setInstructions(instructions);
          setOpeningHours(opening_hours);
          setOpenOnWeekends(open_on_weekends);

          setPreviewImages(images.map(image => image.url));
        })
        .catch(error => {
          console.error(error);

          toast.error('Ocorreu um erro ao buscar o orfanato!');

          if (error.response) {
            toast.error(error.response.data.message);
          }
        })
      ;
    } else {
      api
        .get<Orphanage>(`orphanages-pending/${id}`)
        .then(response => {
          const { 
            name,
            latitude,
            longitude,
            whatsapp,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
          } = response.data;

          setPosition({ latitude, longitude });

          setName(name);
          setWhatsapp(whatsapp);
          setAbout(about);

          setInstructions(instructions);
          setOpeningHours(opening_hours);
          setOpenOnWeekends(open_on_weekends);

          setPreviewImages(images.map(image => image.url));
        })
        .catch(error => {
          console.error(error);

          toast.error('Ocorreu um erro ao buscar o orfanato!');

          if (error.response) {
            toast.error(error.response.data.message);
          }
        })
      ;
    }
  }, [params.id, history]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({ latitude: lat, longitude: lng });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages([...images, ...selectedImages]);

    const selectedImagesPreview = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );


    setPreviewImages([...previewImages, ...selectedImagesPreview]);
  }

  function handleDeleteImage(position: number) {
    const serializedImages = [...images];
    serializedImages.splice(position, 1);

    setImages(serializedImages);

    const serializedPreviewImages = [...previewImages];
    serializedPreviewImages.splice(position, 1);

    setPreviewImages(serializedPreviewImages);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    const data = new FormData();

    data.append('latitude', String(position.latitude));
    data.append('longitude', String(position.longitude));
    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp', whatsapp);

    images.forEach(image => data.append('images', image));
    previewImages.forEach(previewImage => data.append('preview_images', previewImage));

    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    api
      .put(`orphanages/${id}`, data)
      .then(() => {
        toast.success('Orfanato atualizado com sucesso!');

        history.push('/dashboard');
      })
      .catch((error) => {
        console.error(error);

        toast.error('Ocorreu um erro ao atualizar o orfanato.')
      })
    ;

    setLoading(false);
  }

  return (
    <Container isPending={status === "pending"}>
      <Sidebar />

      <Main>
        <PageHeader 
          title={`Editar perfil ${ name ? ("de " + name) : '' }`} 
        />

        <Form onSubmit={handleSubmit}>
          <Fieldset>
            <legend>Dados</legend>

            <MapContainer>
              <Map
                center={[position.latitude, position.longitude]}
                zoom={15}
                onClick={handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {position.latitude !== 0 && position.longitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )}
              </Map>

              <footer>Clique no mapa para adicionar a localização</footer>
            </MapContainer>

            <Input
              name="name"
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Textarea
              name="about"
              label="Sobre"
              instruction="Máximo de 300 caracteres"
              maxLength={300}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            />

            <Input
              name="whatsapp"
              label="Número de Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />

            <Input
              name="images"
              label="Fotos"
              type="file"
              onChange={handleSelectImages}
              accept="image/jpg, image/jpeg, image/png"
              multiple
              required
            >
              <ImagesContainer>
                {previewImages.map((image, index) => {
                  return (
                    <div key={image + index}>
                      <img src={image} alt={name} />

                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <FiX />
                      </button>
                    </div>
                  );
                })}

                <label htmlFor="images">
                  <FiPlus />
                </label>
              </ImagesContainer>
            </Input>
          </Fieldset>

          <Fieldset>
            <legend>Visitação</legend>

            <Textarea
              name="instructions"
              label="Instruções"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />

            <Input
              name="opening_hours"
              label="Horário das visitas"
              value={opening_hours}
              onChange={(e) => setOpeningHours(e.target.value)}
              required
            />

            <SelectButtonContainer>
              <label htmlFor="open_on_weekends">Atende fim de semana?</label>

              <div>
                <SelectButton
                  type="button"
                  isOpen={open_on_weekends}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </SelectButton>
                <SelectButton
                  type="button"
                  isOpen={open_on_weekends}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </SelectButton>
              </div>
            </SelectButtonContainer>
          </Fieldset>
          
          {status === "approved"
            ? (
              <Button
                type="submit"
                disabled={
                  !(
                    position.latitude &&
                    position.longitude &&
                    name &&
                    about &&
                    whatsapp &&
                    previewImages.length &&
                    instructions &&
                    opening_hours
                  )
                    ||
                  (loading && !id)
                }
                loading={loading}
                onClick={handleSubmit}
              >
                { loading ? 'Confirmando...' : 'Confirmar' }
              </Button>
            )
            : (
              <PendingButtonContainer>
                <PendingButton 
                  type="button"
                  onClick={() => history.push(`/orphanages/delete/${id}`)}
                >
                  <FiXCircle />
                  { loading ? 'Recusando...' : 'Recusar'}
                </PendingButton>

                <PendingButton
                  type="submit"
                  onClick={handleSubmit}
                >
                  <FiCheck />
                  { loading ? 'Aceitando...' : 'Aceitar'}
                </PendingButton>
              </PendingButtonContainer>
            )
          }
        </Form>
      </Main>
    </Container>
  );
};

export default EditOrphanage;
