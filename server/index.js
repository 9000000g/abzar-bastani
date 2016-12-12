"use strict";
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


const bst = require('./modules/bst.js.js');

const app = express();


app.use(ses.express({ required: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(config.server.port);

app.post('/login', upload.array(), (req, res) => {
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
app.post('/logout', upload.array(), (req, res) => {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    req.session.me = false;
    res.json(true);
});


app.get('/hi', (req, res) => {
    res.json(true);
});

app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    if (id == 'me') {
        if (req.session == null) {
            res.status(500).json('اشکال در ایجاد سشن!');
            return;
        }
        if (typeof req.session.me == 'undefined' || req.session.me === false) {
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

app.get('/get-all/:table/:filters?/:limit?', (req, res) => {
    if (req.params.table == 'messages') {
        if (req.session == null) {
            res.status(500).json('اشکال در ایجاد سشن!');
            return;
        }
        if (typeof req.session.me == 'undefined' || req.session.me === false) {
            res.status(500).json('ابتدا وارد سیستم شوید!');
            return;
        }
    }
    let filters = {}
    if (req.params.filters) {
        let spl = req.params.filters.split('&');

        for (let i in spl) {
            let keyval = spl[i].split('=');
            if (keyval.length == 2) {
                filters[keyval[0]] = keyval[1];
            }
        }
    }
    bst.getAll(req.params.table, filters, req.params.limit).then((result) => {
            for (var i in result) {
                result[i].file = `${global.config.server.address}:${global.config.server.port}/get-file/${req.params.table}/${result[i].id}`
            }
            res.json(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json('اشکال در بازیابی اطلاعات!');
        });
});

app.get('/get/:table/:id', (req, res) => {
    let filters = {
        id: req.params.id
    }
    bst.getAll(req.params.table, filters).then((result) => {
            for (var i in result) {
                result[i].file = `${global.config.server.address}:${global.config.server.port}/get-file/${req.params.table}/${result[i].id}`
            }
            res.json(result[0]);
        })
        .catch((error) => {
            res.status(500).json('اشکال در بازیابی اطلاعات!');
        });
});
app.get('/get-file/:table/:id', (req, res) => {
    let basedir = `${__dirname}/files`;
    let file = `${basedir}/${req.params.table}-${req.params.id}.jpg`;
    res.sendFile(file);
});
app.post('/insert/:table', upload.single('file'), (req, res) => {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (  req.params.table == 'userproducts' || (req.params.table == 'users' && req.body.type != 1) ) { // mikhad user add kone o typesh 1 nist
        // let do it
    }
    else{
        if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1 ) {
            res.status(500).json('لطفا اول وارد سیستم شوید!');
            return;
        }
    }
    //console.log(req.file)
    //console.log(req.body)

    bst.insert(req.params.table, req.body).then((result) => {
            //console.log('inserted')
            if (typeof req.file != 'undefined' && req.file) {
                let path = `${__dirname}/files/${req.params.table}-${result.insertId}.jpg`;

                fs.renameSync(req.file.path, path);
                res.json(result);
            } else {
                res.json(result);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
});
app.post('/update/:table/:filters', upload.single('file'), (req, res) => {
    if (req.params.table == 'products') {
        if (req.session == null) {
            res.status(500).json('اشکال در ایجاد سشن!');
            return;
        }
        if (typeof req.session.me == 'undefined' || req.session.me === false) {
            res.status(500).json('لطفا اول وارد سیستم شوید!');
            return;
        }
    }
    if (req.params.table == 'users') {
        if (req.session == null) {
            res.status(500).json('اشکال در ایجاد سشن!');
            return;
        }
        if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1 ) {
            res.status(500).json('لطفا اول وارد سیستم شوید!');
            return;
        }
    }
    let filters = {}
    if (req.params.filters) {
        let spl = req.params.filters.split('&');

        for (let i in spl) {
            let keyval = spl[i].split('=');
            if (keyval.length == 2) {
                filters[keyval[0]] = keyval[1];
            }
        }
    }
    console.log(filters);
    bst.update(req.params.table, req.body, filters).then((result) => {
            //console.log('inserted')
            if (typeof req.file != 'undefined' && req.file) {
                let path = `${__dirname}/files/${req.params.table}-${filters.id}.jpg`;
                console.log(path)
                //fs.removeSync(path);
                fs.renameSync(req.file.path, path);
                res.json(result);
            } else {
                res.json(result);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
});

app.post('/tf', upload.single('file'), (req, res) => {
    console.log('got request');
    console.log(req.body);
    console.log(req.file);
    res.send('ok');

});