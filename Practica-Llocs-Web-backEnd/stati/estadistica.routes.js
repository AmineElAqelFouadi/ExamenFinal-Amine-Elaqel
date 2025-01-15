import express from 'express';
import { createEstadistica, getEstadisticas, getUltimosEventos } from '../stati/estadistica.controller.js';

const router = express.Router();

router.post('/', createEstadistica);
router.get('/', getEstadisticas);
router.get('/ultimos', getUltimosEventos);

export { router as estadisticaRouter };
