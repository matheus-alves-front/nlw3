import express from 'express';

import './database/connection';

const app = express();

app.use(express.json());

app.get('/users', (request, response) => {
    return response.json({ message: 'hello world' });
});

app.listen(3333);



// rota = conjunto inteiro do get()
// recurso = usuario

// metodos HTTP = GET, POST, PUT, DELETE

// GET = BUSCAR informaçao (lista, item)
// POST = CRIAR uma informaçao

// PUT = EDITAR uma informaçao
// DELETE = DELETAR uma informaçao

// parametros

// Query params: http://localhost:3333/users?search=matheus&page=2
// Route params: http://localhost:3333/users/1 (identificar um recurso)
// Body: http://localhost:3333/users 
 
// requisiçao / resposta
// localhost:3333
// driver nativo, query buider, ->ORM<-
// object relational mapping

