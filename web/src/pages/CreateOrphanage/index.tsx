import { LeafletMouseEvent } from 'leaflet';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus, FiX } from 'react-icons/fi';
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
} from './styles';

const CreateOrphanage: React.FC = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

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

    images.forEach((image) => {
      data.append('images', image);
    });

    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));


    api
      .post('orphanages', data)
      .then(() => {
        setPosition({ latitude: 0, longitude: 0 });

        setName('');
        setAbout('');
        setWhatsapp('');
        setImages([]);
        
        setInstructions('');
        setOpeningHours('');
        setOpenOnWeekends(false);

        setPreviewImages([]);

        toast.success('Orfanato cadastrado com sucesso!');
      })
      .catch((error) => {
        console.error(error);

        toast.error('Ocorreu um erro ao cadastrar o orfanato.')
      })
    ;

    setLoading(false);
  }

  return (
    <Container>
      <Sidebar />

      <Main>
        <PageHeader title="Adicione um orfanato" />

        <Form onSubmit={handleSubmit}>
          <Fieldset>
            <legend>Dados</legend>

            <MapContainer>
              <Map
                center={[-12.7197249, -38.3271104]}
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
            />

            <Textarea
              name="about"
              label="Sobre"
              instruction="Máximo de 300 caracteres"
              maxLength={300}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <Input
              name="whatsapp"
              label="Número de Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />

            <Input
              name="images"
              label="Fotos"
              type="file"
              onChange={handleSelectImages}
              accept="image/jpg, image/jpeg, image/png"
              multiple
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
            />

            <Input
              name="opening_hours"
              label="Horário das visitas"
              value={opening_hours}
              onChange={(e) => setOpeningHours(e.target.value)}
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

          <Button
            type="submit"
            disabled={
              !(
                position.latitude &&
                position.longitude &&
                name &&
                about &&
                whatsapp &&
                images.length &&
                instructions &&
                opening_hours
              )
                ||
              loading
            }
            loading={loading}
          >
            { loading ? 'Cadastrando...' : 'Cadastrar' }
          </Button>
        </Form>
      </Main>
    </Container>
  );
};

export default CreateOrphanage;
