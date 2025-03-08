const express = require('express');
const app = express();
const PORT = 3070;

/*ROTA GLOBAL*/

// Middleware de log (Onde registra todas as informações da requisição qual o seu método, qual data e a URL acessada (que é a rota da API))
// Precisamos definir essas 2 requisições para acessar as informações, enviar as informações ao servidor e permitir com que as próximas funções sejam executadas em sequência
const logRequests = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Chama a próxima função
};

// Ativando o middleware para TODAS as requisições, para pegar a informações e exibi-lás
app.use(logRequests);

// Então aqui nessa rota quando tentarmos acessar no console será mostrado as informações da requisição
app.get('/', (req, res) => {
    res.send('A API está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

/*ROTA INDIVIDUAL*/
/*ROTA MANIPULAÇÃO DE ERROS*/