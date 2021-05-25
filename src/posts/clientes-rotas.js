const clientesControlador = require('./clientes-controlador');
const passport = require('passport');
const { middlewaresautenticacao } = require('../usuarios');

module.exports = app => {
  app
    .route('/clientes')
    .get(clientesControlador.lista)
    .post(middlewaresautenticacao.bearer,clientesControlador.adiciona);
};
