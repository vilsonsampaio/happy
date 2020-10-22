import { response, Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './controllers/OrphanagesController';
import SessionsController from './controllers/SessionsController';

import authMiddleware from './middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

routes.post('/sign-up', SessionsController.signUp);
routes.post('/sign-in', SessionsController.signIn);
routes.post('/forgot-password', SessionsController.forgotPassword);
routes.put('/reset-password', SessionsController.resetPassword);

routes.get('/auth', authMiddleware, (request, response) => response.status(200).json({ ok: true }));

export default routes;
