'use strict'

const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send({
            messsage: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    try{

        //Recuperar o token
        const token = req.body.token || req.body.token || req.headers['x-access-token'];

        //Decodifica o token
        const data = await authService.decodeToken(token);

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0,6),
            items: req.body.items
        });
        res.status(201).send({
            messsage: 'Pedido cadastrada com sucesso!'
        });
    }
    catch(e){
        res.status(500).send({
            messsage: 'Falha ao processar requisição'
        });
    }
}