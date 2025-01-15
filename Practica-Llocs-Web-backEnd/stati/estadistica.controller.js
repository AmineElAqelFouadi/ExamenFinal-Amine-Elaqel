import { estadisticaModel } from './estadistica.model.js';

export const createEstadistica = async (req, res) => {
    try {
        const estadistica = new estadisticaModel(req.body);
        await estadistica.save();
        res.status(201).send(estadistica);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getEstadisticas = async (req, res) => {
    try {
        const { fechaInicio, fechaFinal, sitioEvento, tipoEvento } = req.query;
        const filters = {};

        if (fechaInicio) filters.createdAt = { $gte: new Date(fechaInicio) };
        if (fechaFinal) filters.createdAt = { ...filters.createdAt, $lte: new Date(fechaFinal) };
        if (sitioEvento) filters.sitioEvento = sitioEvento;
        if (tipoEvento) filters.tipoEvento = tipoEvento;

        const estadisticas = await estadisticaModel.find(filters);
        res.status(200).json(estadisticas || []);// Asegúrate de que la respuesta sea en formato JSON
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getUltimosEventos = async (req, res) => {
    try {
        const { fechaInicio, fechaFinal, sitioEvento, tipoEvento } = req.query;
        const filters = {};
        // mab aqtss forma de if directament podem ja filtrar
        if (fechaInicio) filters.createdAt = { $gte: new Date(fechaInicio) };
        if (fechaFinal) filters.createdAt = { ...filters.createdAt, $lte: new Date(fechaFinal) };
        if (sitioEvento) filters.sitioEvento = sitioEvento;
        if (tipoEvento) filters.tipoEvento = tipoEvento;

        const estadisticas = await estadisticaModel.find(filters).sort({ createdAt: -1 }).limit(10);
        res.send(estadisticas);
    } catch (error) {
        res.status(400).send(error);
    }
};
