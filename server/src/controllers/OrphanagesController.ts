import { Request, Response } from 'express';
import url from 'url';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import Image from '../models/Image';

import orphanageView from '../views/orphanages_view';
import imagesView from '../views/images_view';


export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      where: { is_pending: false },
      relations: ['images'],
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      where: { is_pending: false },
      relations: ['images'],
    });

    return response.json(orphanageView.render(orphanage));
  },

  async indexPending(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      where: { is_pending: true },
      relations: ['images'],
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async showPending(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      where: { is_pending: true },
      relations: ['images'],
    });

    return response.json(orphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      whatsapp,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return {
        path: image.filename,
      };
    });

    const data = {
      name,
      latitude,
      longitude,
      whatsapp,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      images,
      is_pending: true,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      whatsapp: Yup.string().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
      is_pending: Yup.boolean().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },

  async update(request: Request, response: Response) {
    const id = Number(request.params.id);
    const {
      name,
      latitude,
      longitude,
      whatsapp,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    let preview_images = request.body.preview_images;

    if (typeof preview_images === 'string') {
      preview_images = [preview_images];
    } else {
      preview_images = [...preview_images];
    }

    const images = requestImages.map((image) => {
      return {
        path: image.filename,
        orphanage: { id },
      };
    });

    const data = {
      name,
      latitude,
      longitude,
      whatsapp,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      is_pending: false,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      whatsapp: Yup.string().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          orphanage: Yup.object().required().shape({
            id: Yup.number().required(),
          }).required(),
          path: Yup.string().required(),
        }).required()
      ).notRequired(),
      preview_images: Yup.array(
        Yup.string().required()
      ).required(),
      is_pending: Yup.boolean().required(),
    });

    await schema.validate({ ...data, images, preview_images }, {
      abortEarly: false,
    });

    const imagesRepository = getRepository(Image);

    const imagesDB = await imagesRepository.find({ orphanage: { id } });
    
    const imagesPathDB = imagesView.renderMany(imagesDB)?.map(imageDB => imageDB.url);

    const imagesToDelete = imagesPathDB.filter(image => !preview_images.includes(image));

    if (imagesToDelete.length > 0) {
      await Promise.all(imagesToDelete.map(async (imageToDelete) => {
        const path = url.parse(imageToDelete)?.path?.replace('/uploads/', '');

        await imagesRepository.delete({ path, orphanage: { id }});
      }));
    }
    
    await imagesRepository.insert(images);
    
    const orphanagesRepository = getRepository(Orphanage);
      
    await orphanagesRepository.update(id, data);

    return response.status(200).send();
  },

  async destroy(request: Request, response: Response) {
    const id = Number(request.params.id);

    const orphanagesRepository = getRepository(Orphanage);
    const imagesRepository = getRepository(Image);
    
    await orphanagesRepository.delete(id);
    imagesRepository.delete({ orphanage: { id } });
  
    return response.status(200).send();
  }
};
