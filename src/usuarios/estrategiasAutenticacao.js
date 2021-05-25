const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const bearerStrategy = require('passport-http-bearer').Strategy;
const JWT = require('jsonwebtoken');

const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError } = require('../erros');

function verificaUsuario(usuario){
    if (!usuario){
        throw new InvalidArgumentError('Não existe usuário com esse Email')
    }
}
async function verificaSenha(senha, senhaHash){

    const senhaValida = await bcrypt.compare(senha, senhaHash);

    if(!senhaValida){
        throw new InvalidArgumentError('Email ou senha Inválidos!')
    }

}
passport.use(
    
    /*
    localStrategy recebe 2 argumentos
    1° Objeto opicional com opções de modificacao
    2° Funcao de verificação
    */
    new localStrategy(
        /*
        Objeto Opcional, quando não se usa os valores padroes ex:
        username/ password
        */
        {
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        },
        /*
        Esta é a função de verificação, ela recebe 3 argumentos:
        username, password e uma função de callback que retorna o usuario e senha
        caso username e senha estejam corretos.
        */
        async (email, senha, done)=>{
            try {
                const usuario = await Usuario.buscaPorEmail(email);
                verificaUsuario(usuario);
                await verificaSenha(senha, usuario.senhaHash);

                done(null, usuario)
            } catch (erro) {
                done(erro)
            }
        }
    )
);

passport.use(
    new bearerStrategy(
        async (token, done)=>{
        try {
            const payload = JWT.verify(token, process.env.CHAVE_JWT);
            const usuario = await Usuario.buscaPorId(payload.id);
            done(null, usuario);
        } catch (erro) {
            done(erro)
        }
        
    })
)