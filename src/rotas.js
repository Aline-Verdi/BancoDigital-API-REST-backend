const express = require('express');
const contasBancarias = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');
const rotas = express();

rotas.get('/', contasBancarias.listarContasBancarias);
rotas.get('/contas', contasBancarias.listarContasBancarias);
rotas.post('/contas', contasBancarias.criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', contasBancarias.atualizarContaBancaria);
rotas.delete('/contas/:numeroConta', contasBancarias.excluirContaBancaria);
rotas.get('/contas/saldo', contasBancarias.exibirSaldo);
rotas.get('/contas/extrato', contasBancarias.exibirExtrato);

rotas.post('/transacoes/depositar', transacoes.depositar);
rotas.post('/transacoes/sacar', transacoes.sacar);
rotas.post('/transacoes/transferir', transacoes.transferir);

module.exports = rotas;
