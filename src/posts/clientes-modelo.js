const clientesDao = require('./clientes-dao');
const validacoes = require('../validacoes-comuns');

class Clientes {
  constructor(cliente) {
    this.nome = cliente.nome;
    this.cpf = cliente.cpf;
    this.data = cliente.data;
    this.angariador = cliente.angariador;
    this.plano = cliente.plano;
    this.status = cliente.status
    this.numero = cliente.numero;
    this.premio = cliente.premio

    this.valida();
  }

  adiciona() {
    return clientesDao.adiciona(this);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.nome, 'nome');
    validacoes.campoTamanhoMinimo(this.nome, 'nome', 3);

    validacoes.campoStringNaoNulo(this.cpf, 'cpf');
    validacoes.campoTamanhoMaximo(this.cpf, 'cpf', 15);

    validacoes.campoStringNaoNulo(this.angariador, 'angariador');
    validacoes.campoTamanhoMinimo(this.angariador, 'angariador', 3);

    validacoes.campoStringNaoNulo(this.data, 'data');
    validacoes.campoTamanhoMaximo(this.data, 'data', 10);

    validacoes.campoStringNaoNulo(this.plano, 'plano');
    validacoes.campoTamanhoMinimo(this.plano, 'plano', 10);

    validacoes.campoStringNaoNulo(this.premio, 'premio');
    validacoes.campoTamanhoMaximo(this.premio, 'premio', 50);

    validacoes.campoStringNaoNulo(this.numero, 'numero');
    validacoes.campoTamanhoMinimo(this.numero, 'numero', 1);

    validacoes.campoStringNaoNulo(this.status, 'status');
    validacoes.campoTamanhoMaximo(this.status, 'status', 50);
  }

  static lista() {
    return clientesDao.lista();
  }
}

module.exports = Clientes;
