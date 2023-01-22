const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const users = {
    users_list :
    [
        {
            id : 'xyz789',
            name : 'Charlie',
            job : 'Janitor',
        },
        {
            id : 'abc123',
            name : 'Mac',
            job : 'Bouncer',
        },
        {
            id : 'ppp222',
            name : 'Mac',
            job : 'Professor',
        },
        {
            id : 'yat999',
            name : 'Dee',
            job : 'Aspiring actress',
        },
        {
            id : 'zap555',
            name : 'Dennis',
            job : 'Bartender',
        }
    ]
}

app.use(cors());
app.use(express.json());

// app.get('/users', (req, res) => {
//     const name = req.query.name;
//     if (name != undefined){
//         let result = findUserByName(name);
//         result = {users_list: result};
//         res.send(result);
//     }
//     else{
//         res.send(users);
//     }
// });

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
}

app.get('/users/:id', (req, res) => {
    const id = req.params.id; //req.params['id'] also works
    let result = findUsersById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUsersById(id) {
    return users['users_list'].find( (user) => user['id'] === id); 
    // return users['users_list].filter( (user) => user['id'] === id)
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send(userToAdd).end();
});

function addUser(user){
    user.id = newId().toString();
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params.id; //req.params['id'] also works
    let result = findUsersById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        users['users_list'].splice(users['users_list'].indexOf(result),1);
        res.status(204).send('Item successfully deleted.');
    }
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined)
    {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else if (job != undefined)
    {
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByNameAndJob = (name, job) => {
    return users['users_list'].filter( (user) => (user['name'] === name)).filter( (user) => user['job'] === job);
}

const findUserByJob = (job) => {
    return users['users_list'].filter( (user) => (user['job'] === job));
}

function newId(){
    return Math.random();
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});