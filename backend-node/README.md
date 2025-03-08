Introdução ao node e express

Node.js é um ambiente de execução do JavaCript no lado do servidor.
Express é um framework web para o node.js que simplifica a criação de aplicações web e APIs, assim podemos realizar rotas, além de manipulação de requisições e respostas (middleware).


Configurando o projeto
Cria a pasta:
mkdir

Ao criar nosso arquivo e entrar nele:
cd nome do aquivo

Iniciando o projeto no node.js
npm init -y (foi criada o documento package.json)

A partir disso instalar o express (Irá carregar todas as dependências para que o framework possa funcionar)
npm install express

Conseguimos adicionar um arquivo em branco na nossa página através do comando touch

Exemplo:

touch server.js

Ativar a utilização do nosso servidor
node server.js

O que são middlewares
Entendimento de alguns parâmetros padroões utilizados que são o req e res:
o req - Guarda todas as informações contidas pelo usuário como se fosse o cookie além de histórico do que foi acessado pelo usuário.

o res - Com isso, nós utilizamos o res para pegar essas informações guardadas pelo req e assim mostrá-las no servidor.

Possui os seguintes métodos:
res.send(): Que envia a resposta de acordo com o formato no qual ele está.
res.json(): Envia como um JSON;
res.status(): Que retorna status de resposta.

CRUD basicamente são as chamadas que realizamos para fazer alguma modificação, seja para criar, editar, excluir etc...

CONCLUSÃO DO PRIMEIRO TESTE COM USO DO CRUD: Basicamente o crud são todas essas requisições que utilizamos para realizar modificações nos dados presentes no JSON. Para realizar essas modificações adicionar, apagar, utilizamos o postman para fazer esse teste e no POSTMAN pegamos a API que é a porta do servidor que criamos e adicionamos lá no URL junto a sua rota que basicamente mostra os dados contidos nessa rota.

DÚVIDA QUE TENHO: Quando aplicado o front end que é realizado todas as interações e assim enviamos dados não é necessário o postman, ele é só para realizar teste das requisições?
R: Isso mesmo, apenas para teste com a presença do frontend passamos a utilizá-lo de outra forma, a partir do momento em que é digitado uma informação e enviada o servidor processa essa requisição e armazena (e isso adicionamos como uma função que o botão deve realizar ao ser clicado)

O arquivo server.js foi criado para realizar os primeiros testes com o uso do CRUD, nele basicamente foi a forma básica de criarmos funções para as requisições que foram executadas no postman, para adicionar, editar usuários e etc...

Revisão: Middlewares processam as requisições antes da função final. Eles podem modificar, validar ou analisar os dados recebidos antes de enviá-los para a função responsável pela resposta. Por exemplo, um middleware pode verificar se os dados existem, validar seu formato ou autenticar um usuário antes de liberar o acesso à próxima etapa do fluxo.

Para a aplicação do JWT (Json web token) no nosso código é necessário primeiro a sua instalação:
-- npm install jsonwebtoken

No nosso código sobre a prática no jwt.js

A SECRET_KEY é uma chave única do servidor usada para gerar e validar tokens JWT. Quando um usuário faz login, ele recebe um token JWT único, que contém informações como id e username. Esse token permite que o usuário acesse rotas protegidas do servidor e faça requisições. O JWT não cria servidores separados, mas garante que cada usuário só acesse os dados permitidos para ele dentro do mesmo sistema.

CONCLUSÃO APRENDIZADO SOBRE USO DE MIDDLEWARES E JWT: Bom o middlewares são funções executadas antes de outras para realizar validações ou pegar dados para dar continuidade ao longo do fluxo, e com o uso do JWT conseguimos ter um controle de quem acessa dados expecificos, então no caso para acessar as rotas para realizar as requisições é necessário fazer login junto a utilização do token gerado para que consiga entrar no servidor.


DESAFIO FINAL PARA FIXAÇÃO DE APRENDIZADO (Próximos passos):
Como funcionaria:
Cadastro e Login do Usuário:

Quando o usuário se cadastra, você salva as informações no banco de dados, incluindo o ID do usuário.
Quando o usuário faz o login, ele recebe um token JWT que contém o ID do usuário e talvez algumas outras informações, como o username. Esse token será utilizado para autenticar as requisições subsequentes.
Filtrando as Tarefas por ID do Usuário:

Ao adicionar uma nova tarefa, você associa a tarefa ao ID do usuário. Isso pode ser feito armazenando o userId junto com as outras propriedades da tarefa (ex: título, descrição, status, etc).
Quando um usuário faz uma requisição para obter as tarefas, você usa o ID do usuário (extraído do token JWT) para filtrar e retornar apenas as tarefas desse usuário.
Exemplo de como isso ficaria no código:
1. Estrutura da Tarefa no Banco de Dados (ou array, para exemplo simples):
Cada tarefa pode ter a seguinte estrutura:

json
Copiar
Editar
{
  "id": 1,
  "userId": 123,       // ID do usuário dono da tarefa
  "title": "Comprar leite",
  "description": "Comprar leite no supermercado",
  "status": "pendente",
  "dueDate": "2025-03-10"
}
2. Como armazenar uma nova tarefa:
Ao criar uma tarefa, associe o userId do usuário autenticado (do token JWT) com a tarefa:

js
Copiar
Editar
app.post('/tasks', authenticateToken, (req, res) => {
    const { title, description, dueDate } = req.body;
    const userId = req.user.id;  // ID do usuário extraído do token JWT

    const newTask = {
        id: tasks.length + 1,
        userId: userId,
        title: title,
        description: description,
        status: "pendente",
        dueDate: dueDate
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});
3. Filtrando as tarefas do usuário:
Ao buscar as tarefas, você deve filtrar as tarefas pelo userId do token:

js
Copiar
Editar
app.get('/tasks', authenticateToken, (req, res) => {
    const userId = req.user.id;  // ID do usuário extraído do token JWT

    // Filtra as tarefas para que apenas as do usuário logado sejam retornadas
    const userTasks = tasks.filter(task => task.userId === userId);
    
    res.json(userTasks);
});
4. Atualizando ou Deletando uma tarefa:
Quando o usuário deseja editar ou deletar uma tarefa, você também vai filtrar a tarefa com base no userId para garantir que ele só possa editar ou excluir suas próprias tarefas.

Por exemplo, ao atualizar uma tarefa:

js
Copiar
Editar
app.put('/tasks/:id', authenticateToken, (req, res) => {
    const taskId = parseInt(req.params.id);
    const userId = req.user.id;

    const task = tasks.find(t => t.id === taskId && t.userId === userId);  // Verifica se a tarefa pertence ao usuário

    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada ou você não tem permissão para editá-la' });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    
    res.json(task);
});
Resumo:
ID do usuário é associado a cada tarefa.
Quando o usuário faz uma requisição (GET, PUT, DELETE), o ID do usuário no token JWT é usado para filtrar as tarefas, garantindo que ele só possa acessar, editar ou excluir suas próprias tarefas.