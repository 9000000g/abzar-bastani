global.config = require('./config.json');

const express = require('express');
const cors = require('cors-express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const ses = require('se-session');
const multer = require('multer');
const upload = multer({
    dest: `${__dirname}/tmp/`,
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    }
});


const bst = require('./modules/bst.js');

const app = express();


app.use(ses.express({ required: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(config.server.port);

app.post('/login', (req, res) => {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (!req.body.username ||
        !req.body.password ||
        req.body.password.length < 6
    ) {
        res.status(500).json('اطلاعات ورودی اشتباه است!');
        return;
    }
    req.session.me = false;
    bst.users(req.body.username, req.body.password).then((result) => {
            req.session.me = result;
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json('اشکال در بازیابی اطلاعات!');
        });
});
app.post('/logout', (req, res) => {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    req.session.me = false;
    res.json(true);
});



app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    if (id == 'me') {
        if (req.session == null) {
            res.status(500).json('اشکال در ایجاد سشن!');
            return;
        }
        if (req.session.me === false) {
            res.json(false);
            return;
        } else {
            id = req.session.me.id;
        }
    }
    bst.users(id).then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json('اشکال در بازیابی اطلاعات!');
        });
});

app.get('/table/:table', (req, res) => {
    bst.getAll(req.params.table).then((result) => {
            for (var i in result) {
                result[i].file = `${global.config.server.address}:${global.config.server.port}/table/${req.params.table}/${result[i].id}/file`
            }
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json('اشکال در بازیابی اطلاعات!');
        });
});
app.get('/table/:table/:id', (req, res) => {
    bst.get(req.params.table, req.params.id).then((result) => {
            result.file = `${global.config.server.address}:${global.config.server.port}/table/${req.params.table}/${result.id}/file`
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json('اشکال در بازیابی اطلاعات!');
        });
});
app.get('/table/:table/:id/file', (req, res) => {
    let basedir = `${__dirname}/files`;
    let file = `${basedir}/${req.params.table}-${req.params.id}.jpg`;
    res.sendFile(file);
});
app.post('/table/:table/insert', upload.single('file'), (req, res) => {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (req.session.me === false) {
        res.status(500).json('لطفا اول وارد سیستم شوید!');
        return;
    }
    //console.log(req.body)
    bst.insert(req.params.table, req.body).then((result) => {
            if (typeof req.file != 'undefined' && req.file) {
                let path = `${__dirname}/files/${req.params.table}-${result.insertId}.jpg`;

                fs.renameSync(req.file.path, path);
                res.json(result);
            } else {
                res.json(result);
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});


app.post('/tf', upload.single('file'), (req, res) => {
    console.log('got request');
    console.log(req.body);
    console.log(req.file);
    res.send('ok');

});