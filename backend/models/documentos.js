import mongoose, { Schema } from 'mongoose';
const documentosSchema = new Schema({
    titulo: { type: String, maxlength: 64 },
    descripcion: { type: String, maxlength: 64 },
    repositorio: { type: String, maxlength: 64 },
    estado: { type: Number, default: 1 },
    documento: {type: String, maxlength: 200},
    createdAt: { type: Date, default: Date.now }
});

const Documentos = mongoose.model('documentos', documentosSchema);
export default Documentos;