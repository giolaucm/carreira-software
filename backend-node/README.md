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

