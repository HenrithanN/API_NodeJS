const Clientes = require('./clientes-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');

module.exports = {
  adiciona: async (req, res) => {
    try {
      const cliente = new Clientes(req.body);
      await cliente.adiciona();
      
      res.status(201).send(cliente);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  lista: async (req, res) => {
    try {
      const clientes = await Cliente.lista();
      res.send(clientes);
    } catch (erro) {
      return res.status(500).json({ erro: erro });
    }
  }
};
