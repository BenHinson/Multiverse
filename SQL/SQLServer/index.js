const express = require("express");
const subdomain = require('express-subdomain');

const db = require('./database.js');

const app = express();
const playgroundRouter = express.Router({mergeParams: true});

app.use(subdomain('playground', playgroundRouter))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/////////////////////////////////////////////////////////

app.listen(2053, () => {console.log(`Server running on port: ${2053}`)});

// ? https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

// ? localhost:2053/api/users
// ? playground.nanode.one/api/users

app.get('/flipcoin', (req, res, next) => {
    let headsOrTails = Math.round(Math.random());
    return res.json({
        side: (headsOrTails ? 'Heads' : 'Tails')
    })
})


app.get('/api/users', (req, res, next) => {
    const sql = 'SELECT * from user';
    const params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {return res.status(400).json({'error': err.message})}
        res.status(200).json({
            'data': rows
        })
    })
})

app.get('/api/user/:id', (req, res, next) => {
    const sql = 'select * from user where id = ?';
    const params = [req.params.id]; // The array here prevent SQL Injection. Each ? in sql is replace in order with the param index.

    db.get(sql, params, (err, row) => {
        if (err) { return res.status(400).json({'error': err.message}) }
        row
            ? res.json({'message': 'success', 'data': row })
            : res.json({'message': 'No user with that ID'})
    })
})

app.post('/api/user/', (req, res, next) => {
    if (!req.body.password || !req.body.email) {
        return res.status(400).json({'error': 'No Username or Password'})
    }

    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    const params = [data.name, data.email, data.password];

    db.run(sql, params, (err, result) => {
        if (err) { return res.status(400).json({'error': err.message}) }
        res.json({
            'message': 'success',
            'data': data,
            'id': this.lastID
        })
    })
})

app.patch('/api/user/:id', (req, res, next) => {
    console.log('PATCH HEARD')
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password || null
    }
    db.run(
        `UPDATE user set
            name = COALESCE(?,name),
            email = COALESCE(?,email),
            password = COALESCE(?,password)
            WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        function(err, results) {
            console.log(err);
            if (err) { return res.status(400).json({'error': res.message}) }
            console.log('Patch successful');
            console.log(this.changes);
            res.json({
                message: 'success',
                data: data,
                changes: this.changes
            })
        }
    )
})

app.delete('/api/user/:id', (req, res, next) => {
    db.run(
        `DELETE FROM user WHERE id = ?`,
        [req.params.id],
        function (err, result) {
            if (err) { return res.status(400).json({'error': res.message}) }
            res.json({'message': 'deleted', changes: this.changes})
        }
    )
})

app.get('/', (req, res, next) => { res.json({'message': 'success'}) });

app.use(function(req, res) { res.status(400) });

/////////////////////////////////////////////////////////

playgroundRouter.get('/example', function(req, res) {
    res.sendFile('./playground.html', {root: __dirname});
})