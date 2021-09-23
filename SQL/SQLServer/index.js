const express = require("express");
const subdomain = require('express-subdomain');
const bodyParser = require("body-parser");

const db = require('./database.js');

const app = express();
const router = express.Router({mergeParams: true});

app.use(subdomain('playground', require('./playground.js')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

///////////////////

var HTTP_PORT = 2053; // 8000 2053 443
app.listen(HTTP_PORT, () => {console.log(`Server running on port: ${HTTP_PORT}`)});

// ! https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

// ? localhost:2053/api/users
// ? playground.nanode.one/api/users
// This server is accessible via playground.nanode.one via a reverse proxy on the nanode server that points towards this localhost.


app.get('/api/users', (req, res, next) => {
    const sql = 'SELECT * from user';
    const params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {return res.status(400).json({'error': err.message})}
        res.json({
            'message': 'success',
            'data': rows
        })
    })
})

app.get('/api/user/:id', (req, res, next) => {
    console.log(`Requesting: ${req.params.id}`);
    const sql = 'select * from user where id = ?';
    const params = [req.params.id]; // The array here prevent SQL Injection. Each ? in sql is replace in order with the param index.
    db.get(sql, params, (err, row) => {
        if (err) { return res.status(400).json({'error': err.message}) }
        res.json({
            'message': 'success',
            'data': row
        })
    })
})

app.post('/api/user/', (req, res, next) => {
    console.log(45);
    const errors = [];
    if (!req.body.password) { errors.push('No Password') }
    if (!req.body.email) { errors.push('No Email') }
    if (errors.length) { return res.status(400).json({'error': errors.join('')}) }

    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    const params = [data.name, data.email, data.password]
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

// res.sendFile('./index.html', {root: __dirname});
app.get('/', (req, res, next) => { res.json({'message': 'success'}) });


app.use(function(req, res) { res.status(400) });
