require('dotenv').config();
const express = require('express');
const rotas = require('./rotas');
const app = express();

app.use(express.json());

app.use(rotas);

app.listen(process.env.PORTA, () => {
    console.log(`API rodando na porta ${process.env.PORTA}`);
});
