import { response, Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';

import authMiddleware from './middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

routes.post('/users', UsersController.create);
routes.get('/users', UsersController.show);

routes.get('/auth', authMiddleware, (request, response) => response.status(200).json({ ok: true }));

export default routes;
