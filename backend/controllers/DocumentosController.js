import models from '../models';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import token from '../services/token';



export default {   
    add: async (req, res, next) => {
        try {
        req.body.documento = '/documentos/' + req.file.filename;
        const reg = await models.Documentos.create(req.body);
        res.status(200).json(reg);
        console.log(req.file);
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrio un error'
        });
        next(e);
    }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findOne({ _id: req.query._id });
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    listDocumentos: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Documentos.find({ $or: [{ 'titulo': new RegExp(valor, 'i') }, { 'descripcion': new RegExp(valor, 'i') }] }, { createdAt: 0 })
                .sort({ 'createdAt': -1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    listDocumentosPrimerForo: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Documentos.find({ $or: [{ 'titulo': new RegExp(valor, 'i') }, { 'descripcion': new RegExp(valor, 'i') }],"repositorio":{"$eq":"Primer Foro"} })
                .sort({ 'createdAt': -1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    listDocumentosSegundoForo: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Documentos.find({ $or: [{ 'titulo': new RegExp(valor, 'i') }, { 'descripcion': new RegExp(valor, 'i') }],"repositorio":{"$eq":"Segundo Foro"} })
                .sort({ 'createdAt': -1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    
    listDocumentosBlindaje: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Documentos.find({ $or: [{ 'titulo': new RegExp(valor, 'i') }, { 'descripcion': new RegExp(valor, 'i') }],"repositorio":{"$eq":"Blindaje Electoral"} })
                .sort({ 'createdAt': -1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            let pas = req.body.password;
            const reg0 = await models.Usuario.findOne({ _id: req.body._id });
            if (pas != reg0.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { rol: req.body.rol, nombre: req.body.nombre, tipo_documento: req.body.tipo_documento, num_documento: req.body.num_documento, direccion: req.body.direccion, telefono: req.body.telefono, email: req.body.email, password: req.body.password });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findOneAndDelete({ _id: req.body._id });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error GUSANOOOOO'
            });
            next(e);
        }
    }
}