import React, { useState } from 'react';
import { Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from 'styled-components';

import Input from '../../../components/Input';

import api from '../../../services/api';

import {
  Container,
  Title,
  Separator,
  UploadedImagesContainer,
  UploadedImage,
  ImagesInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
} from './styles';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

const OrphanageData: React.FC = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as OrphanageDataRouteParams;

  const theme = useTheme();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita! Precisamos de acesso às suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);
  }

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params.position;

    console.log({
      name,
      latitude,
      longitude,
      whatsapp,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    });

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp', whatsapp);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image, index) => {
      data.append('images', {
        type: 'image/jpg',
        name: `image_${index}.jpg`,
        uri: image,
      } as any);
    });

    await api.post('orphanages', data);

    navigation.navigate('OrphanagesMap');
  }

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>Dados</Title>
      <Separator />

      <Input
        label="Nome"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 16 }}
      />

      <Input
        label="Sobre"
        comment="Máximo de 300 caracteres"
        multiline
        value={about}
        onChangeText={setAbout}
        style={{ marginBottom: 16 }}
      />

      <Input
        label="WhatsApp"
        value={whatsapp}
        onChangeText={setWhatsApp}
        style={{ marginBottom: 16 }}
      />

      <Input label="Fotos" hideInput>
        <UploadedImagesContainer>
          {images.map((image) => {
            return <UploadedImage key={image} source={{ uri: image }} />;
          })}
        </UploadedImagesContainer>
      </Input>

      <ImagesInput onPress={handleSelectImages}>
        <Feather name="plus" size={24} color={theme.colors.primary} />
      </ImagesInput>

      <Title>Visitação</Title>
      <Separator />

      <Input
        label="Instruções"
        multiline
        value={instructions}
        onChangeText={setInstructions}
        style={{ marginBottom: 16 }}
      />

      <Input
        label="Horario de visitas"
        value={opening_hours}
        onChangeText={setOpeningHours}
        style={{ marginBottom: 32 }}
      />

      <Input
        hideInput
        label="Atende final de semana?"
        comment={
          <Switch
            thumbColor={theme.colors.shapesPrimary}
            trackColor={{
              false: theme.colors.backgroundLineInWhite,
              true: theme.colors.success,
            }}
            value={open_on_weekends}
            onValueChange={setOpenOnWeekends}
          />
        }
      />

      <NextButton onPress={handleCreateOrphanage}>
        <NextButtonText>Cadastrar</NextButtonText>
      </NextButton>
    </Container>
  );
};

export default OrphanageData;
