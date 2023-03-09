# Desafio | Back-end - Módulo 2 | Cubos Academy

## Desafio aplicado pela Cubos Academy referente ao módulo 2 do curso:

-   Javascript: Funções (Callbacks), Métodos de arrays II e III, Datas em Js.
-   Node: Servidores, APIs REST, JSON, Integrações.

## O objetivo foi desenvolver uma API REST para um Banco Digital que permita:

-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depositar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

### Persitência dos dados:

Os dados estão persistidos em memória, no objeto existente dentro do arquivo bancodedados.js.

---
### Criar conta bancária

#### `POST` `/contas`

Esse endpoint irá criar uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

    -   Criação de uma nova conta cujo número é único
    -   CPF é um campo único.
    -   E-mail é um campo único.
    -   Verificaração se todos os campos foram informados (todos são obrigatórios)
    -   Definição do saldo inicial da conta como 0

-   **Requisição** - O corpo (body) irá possuir um objeto com as seguintes propriedades:

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

-   **Resposta**

    Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta irá possuir ***status code*** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

#### Exemplo de Requisição

```javascript
// POST /contas
{
    "nome": "Maria",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "maria@email.com",
    "senha": "12345"
}
```

#### Exemplo de Resposta

```javascript
// Sem conteúdo no corpo (body) da resposta
```
```javascript
{
    "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
}
```
---
### Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint irá listar todas as contas bancárias existentes.

    -   Verificação se a senha do banco foi informada (passado como query params na url)
    -   Validação se a senha do banco está correta

-   **Requisição** - query params 

    -   senha_banco

-   **Resposta**
    -   listagem de todas as contas bancárias existentes

#### Exemplo de resposta

```javascript
// 2 contas encontradas
[
    {
        "numero": "1",
        "saldo": 0,
        "usuario": {
            "nome": "Maria",
            "cpf": "00011122233",
            "data_nascimento": "2021-03-15",
            "telefone": "71999998888",
            "email": "maria@email.com",
            "senha": "1234"
        }
    },
    {
        "numero": "2",
        "saldo": 1000,
        "usuario": {
            "nome": "João",
            "cpf": "00011122234",
            "data_nascimento": "2021-03-15",
            "telefone": "71999998888",
            "email": "joao@email.com",
            "senha": "12345"
        }
    }
]

// nenhuma conta encontrada
[]
```
```javascript
{
    "mensagem": "A senha do banco informada é inválida!"
}
```
---
### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint irá atualizar apenas os dados do usuário de uma conta bancária.

    -   Verificação se foi passado todos os campos no body da requisição
    -   Verificação se o número da conta passado como parametro na URL é válida
    -   Verificação se já existe outro registro com o mesmo CPF 
    -   Verificação se já existe outro registro com o mesmo E-mail
    -   Atualização dos dados do usuário de uma conta bancária

-   **Requisição** - O corpo (body) irá possuir um objeto com todas as seguintes propriedades:

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

-   **Resposta**

    Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta irá possuir ***status code*** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

#### Exemplo de Requisição
```javascript
// PUT /contas/:numeroConta/usuario
{
    "nome": "Maria Helena",
    "cpf": "99911122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "mariahelena@email.com",
    "senha": "12345"
}
```

#### Exemplo de Resposta

```javascript
// Sem conteúdo no corpo (body) da resposta
```
```javascript
{
    "mensagem": "O CPF informado já existe cadastrado!"
}
```
---
### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint irá excluir uma conta bancária existente.

    -   Verificação se o número da conta passado como parametro na URL é válido
    -   Permitir excluir uma conta bancária apenas se o saldo for 0 (zero)
    -   Remover a conta do objeto de persistência de dados.

-   **Requisição**

    -   Numero da conta bancária (passado como parâmetro na rota)

-   **Resposta**

    Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta irá possuir ***status code*** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

#### Exemplo de Resposta

```javascript
// Sem conteúdo no corpo (body) da resposta
```
```javascript
{
    "mensagem": "A conta só pode ser removida se o saldo for zero!"
}
```
---
### Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint irá somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

    -   Verificação se o número da conta e o valor do deposito foram informados no body
    -   Verificação se a conta bancária informada existe
    -   Não permitir depósitos com valores negativos ou zerados
    -   Somar o valor de depósito ao saldo da conta encontrada

-   **Requisição** - O corpo (body) irá possuir um objeto com as seguintes propriedades:

    -   numero_conta
    -   valor

-   **Resposta**

    Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta irá possuir ***status code*** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

#### Exemplo de Requisição
```javascript
// POST /transacoes/depositar
{
	"numero_conta": "1",
	"valor": 1900
}
```

#### Exemplo de Resposta

```javascript
// Sem conteúdo no corpo (body) da resposta
```
```javascript
{
    "mensagem": "O número da conta e o valor são obrigatórios!"
}
```

#### Exemplo do registro de um depósito

```javascript
{
    "data": "2021-08-10 23:40:35",
    "numero_conta": "1",
    "valor": 10000
}
```
---
### Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint irá realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

    -   Verificação se o número da conta, o valor do saque e a senha foram informados no body
    -   Verificação se a conta bancária informada existe
    -   Verificação se a senha informada é uma senha válida para a conta informada
    -   Verificação se há saldo disponível para saque
    -   Subtração do valor sacado do saldo da conta encontrada

-   **Requisição** - O corpo (body) irá possuir um objeto com as seguintes propriedades:

    -   numero_conta
    -   valor
    -   senha

-   **Resposta**

    Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta irá possuir ***status code*** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

#### Exemplo de Requisição
```javascript
// POST /transacoes/sacar
{
	"numero_conta": "1",
	"valor": 1900,
    "senha": "123456"
}
```
#### Exemplo de Resposta
```javascript
// Sem conteúdo no corpo (body) da resposta
```
```javascript
{
    "mensagem": "O valor não pode ser menor que zero!"
}
```

#### Exemplo do registro de um saque

```javascript
{
    "data": "2021-08-10 23:40:35",
    "numero_conta": "1",
    "valor": 10000
}
```
---
### Transferir

#### `POST` `/transacoes/transferir`

Esse endpoint irá permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.

    -   Verificação se o número da conta de origem, de destino, senha da conta de origem e valor da transferência foram informados no body
    -   Verificação se a conta bancária de origem informada existe
    -   Verificação se a conta bancária de destino informada existe
    -   Verificação se a senha informada é uma senha válida para a conta de origem informada
    -   Verificação se há saldo disponível na conta de origem para a transferência
    -   Subtração do valor da transfência do saldo na conta de origem
    -   Soma do valor da transferência no saldo da conta de destino

-   **Requisição** - O corpo (body) irá possuir um objeto com as seguintes propriedade:

    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha

-   **Resposta**

    Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta irá possuir ***status code*** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

#### Exemplo de Requisição
```javascript
// POST /transacoes/transferir
{
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "123456"
}
```
#### Exemplo de Resposta

```javascript
// Sem conteúdo no corpo (body) da resposta
```
```javascript
{
    "mensagem": "Saldo insuficiente!"
}
```

#### Exemplo do registro de uma transferência

```javascript
{
    "data": "2021-08-10 23:40:35",
    "numero_conta_origem": "1",
    "numero_conta_destino": "2",
    "valor": 10000
}
```
---
### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint irá retornar o saldo de uma conta bancária.

    -   Verificação se o número da conta e a senha foram informadas (passado como query params na url)
    -   Verificação se a conta bancária informada existe
    -   Verificação se a senha informada é uma senha válida
    -   Exibição do saldo da conta bancária em questão

-   **Requisição** - query params

    -   numero_conta
    -   senha

-   **Resposta**

    -   Saldo da conta

#### Exemplo de Resposta

```javascript
{
    "saldo": 13000
}
```
```javascript
{
    "mensagem": "Conta bancária não encontada!"
}
```
---
### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint irá listar as transações realizadas de uma conta específica.

    -   Verificação se o número da conta e a senha foram informadas (passado como query params na url)
    -   Verificação se a conta bancária informada existe
    -   Verificação se a senha informada é uma senha válida
    -   Retornado a lista de transferências, depósitos e saques da conta em questão.

-   **Requisição** - query params

    -   numero_conta
    -   senha

-   **Resposta**

    -   Relatório da conta

#### Exemplo de Resposta

```javascript
{
  "depositos": [
    {
      "data": "2021-08-18 20:46:03",
      "numero_conta": "1",
      "valor": 10000
    },
    {
      "data": "2021-08-18 20:46:06",
      "numero_conta": "1",
      "valor": 10000
    }
  ],
  "saques": [
    {
      "data": "2021-08-18 20:46:18",
      "numero_conta": "1",
      "valor": 1000
    }
  ],
  "transferenciasEnviadas": [
    {
      "data": "2021-08-18 20:47:10",
      "numero_conta_origem": "1",
      "numero_conta_destino": "2",
      "valor": 5000
    }
  ],
  "transferenciasRecebidas": [
    {
      "data": "2021-08-18 20:47:24",
      "numero_conta_origem": "2",
      "numero_conta_destino": "1",
      "valor": 2000
    },
    {
      "data": "2021-08-18 20:47:26",
      "numero_conta_origem": "2",
      "numero_conta_destino": "1",
      "valor": 2000
    }
  ]
}
```

```javascript
{
    "mensagem": "Conta bancária não encontada!"
}
```

