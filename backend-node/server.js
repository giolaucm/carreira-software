const express = require('express');
const app = express();
const PORT = 3040;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

app.get('/', (req, res) => {
    res.send('A API está funcionando!');
});

// Lista inicial de usuários
let users = [
    { id: 1, name: 'João' },
    { id: 2, name: 'Maria' },
    { id: 3, name: 'José' }
];

// 🔹 Criar usuário (POST)
app.post('/users', (req, res) => {
    const { name } = req.body;
    
    // Verifica se o nome foi enviado
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório!' });
    }

    const newUser = { id: users.length + 1, name };
    users.push(newUser);

    console.log('Usuário adicionado:', newUser);
    res.status(201).json(newUser);
});

// 🔹 Atualizar usuário (PUT)
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name } = req.body;

    // Verifica se o ID passado é válido
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Verifica se um novo nome foi enviado
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório!' });
    }

    user.name = name;
    console.log(`Usuário com ID ${userId} atualizado para:`, user);
    res.json(user);
});

// 🔹 Deletar usuário (DELETE)
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userExists = users.some(u => u.id === userId);

    if (!userExists) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    users = users.filter(u => u.id !== userId);
    console.log(`Usuário com ID ${userId} foi excluído!`);

    res.status(204).send();
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
