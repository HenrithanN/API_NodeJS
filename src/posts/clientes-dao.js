const db = require('../../database');

module.exports = {
  adiciona: cliente => {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO clientes (
          nome,
          data,
          cpf,
          numero,
          premio,
          angariador,
          plano,
          status,
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [cliente.nome, cliente.data, cliente.cpf, cliente.numero,
          cliente.premio, cliente.angariador, cliente.plano, cliente.status
        ],
        erro => {
          if (erro) {
            return reject('Erro ao adicionar o Cliente!');
          }

          return resolve();
        }
      );
    });
  },

  lista: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM posts`, (erro, resultados) => {
        if (erro) {
          return reject('Erro ao listar os posts!');
        }

        return resolve(resultados);
      });
    });
  }
};
