import mongoose from 'mongoose';

const estadisticaSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    userId: { type: String, default: null },
    sitioEvento: { type: String, required: true },
    tipoEvento: { type: String, enum: ['visita', 'click'], required: true },
    createdAt: { type: Date, default: Date.now }
});

const estadisticaModel = mongoose.model('Estadistica', estadisticaSchema);

export { estadisticaModel };
