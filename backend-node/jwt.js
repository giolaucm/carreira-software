const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3030;

app.use(express.json());

// Chave secreta para assinar os tokens (nunca expor publicamente!)
const SECRET_KEY = 'minhaChaveSecreta';

// Simulando um banco de dados de usuários
const users = [
    { id: 1, username: 'giovanna', password: '12345' }
];

// Endpoint de Login - Gera um token JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário existe no banco de dados
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas!' });
    }

    // Cria um token válido por 1 hora
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

// Middleware para proteger rotas
const autenticar = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Pegando o token do header

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido!' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Salva os dados do usuário na requisição
        next(); // Continua para a próxima função
    } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado!' });
    }
};

// Rota protegida que só pode ser acessada com um token válido
app.get('/perfil', autenticar, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.user.username}!`, user: req.user });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
