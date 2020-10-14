import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload'
import OrphnagesController from './controllers/OrphnagesController'

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphnages', OrphnagesController.index);
routes.get('/orphnages/:id', OrphnagesController.show);
routes.post('/orphnages', upload.array('images'), OrphnagesController.create);

export default routes;

// post - criar
// get - buscar
// put - editar
// delete - deletar
