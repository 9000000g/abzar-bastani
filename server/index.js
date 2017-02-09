"use strict";
global.config = require('./config.json');

const express = require('express');
const cors = require('cors-express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const ses = require('se-session');
const multer = require('multer');
const Finder = require('fs-finder');

const jimp = require('jimp');

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
console.log(`listening to ${config.server.address}:${config.server.port}`)
app.post('/login', upload.array(), (req, res) => {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (!req.body.username ||
        !req.body.password
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
            res.status(500).json(error);
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
    if (req.params.table == 'messages' && filters.type != 5) {
        if (req.session == null) {
            res.status(500).json('اشکال در ایجاد سشن!');
            return;
        }
        if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1) {
            res.status(500).json('ابتدا وارد سیستم شوید!');
            return;
        }
    }
    bst.getAll(req.params.table, filters, req.params.limit).then((result) => {
            for (var i in result) {
                result[i].files = bst.getFiles( req.params.table, result[i].id, true );
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
                result[i].files = bst.getFiles( req.params.table, result[i].id, true );
            }
            res.json(result[0]);
        })
        .catch((error) => {
            res.status(500).json('اشکال در بازیابی اطلاعات!');
        });
});


app.post('/add-file/:table/:id', upload.single('file'), (req,res) =>{
    if (  req.params.table == 'messages' || req.params.table == 'userproducts' ) { // mikhad user add kone o typesh 1 nist
        // let do this
    }
    else{
        if (req.session == null) {
            res.status(500).json('اشکال در ایجاد سشن!');
            return;
        }
        if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1 ) {
            res.status(500).json('لطفا اول وارد سیستم شوید!');
            return;
        }
    }
    //fs.unlinkSync
    if (typeof req.file != 'undefined' && req.file) {
        let rnd = new Date().getTime();
        let path = `${__dirname}/files/${req.params.table}-${req.params.id}-${rnd}.jpg`;
        jimp.read(req.file.path).then( (lenna)=>{
            lenna.resize(450, jimp.AUTO)
                .quality(45)
                .write(path, ()=>{
                    res.json('با موفقیت آپلود شد');
                });
        });
    }
    else{
        res.status(500).json('اشکال در آپلود فایل!');
    }
});
app.get('/get-files/:table/:id', (req, res) => {
    res.json( bst.getFiles( req.params.table, req.params.id ) );
});
app.get('/get-file/:table/:id/:index', (req, res) => {
    let file = `${__dirname}/files/${req.params.table}-${req.params.id}-${req.params.index}.jpg`;
    if( fs.existsSync(file) ){
        res.sendFile(file);
    }
    else{
        res.sendFile(`${__dirname}/files/notfound.jpg`);
    }
});
app.post('/delete-file/:table/:id/:index', (req, res) => {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1 ) {
        res.status(500).json('لطفا اول وارد سیستم شوید!');
        return;
    }
    let file = `${__dirname}/files/${req.params.table}-${req.params.id}-${req.params.index}.jpg`;
    if( fs.existsSync(file) ){
        let ret = fs.unlinkSync(file);
        if( ret ){
            res.json('با موفقیت حذف شد');
        }
        else{
            res.status(500).json('اشکال در حذف فایل');
        }
    }
    else{
        res.status(500).json('فایل درخواستی در سیستم موجود نیست');
    }
});







app.get('/get-file/:table/:id/', (req, res) => {
    let basedir = `${__dirname}/files`;
    let file = `${basedir}/${req.params.table}-${req.params.id}.jpg`;
    if( fs.existsSync(file) ){
        res.sendFile(file);
    }
    else{
        res.sendFile(`${basedir}/notfound.jpg`);
    }
    
});
app.post('/insert/:table', upload.single('file'), (req, res) => {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (  req.params.table == 'messages' || req.params.table == 'userproducts' || (req.params.table == 'users' && req.body.type != 1) ) { // mikhad user add kone o typesh 1 nist
        if( req.params.table == 'messages' ){
            req.body.user = req.session.me.id;
            req.body.read = 0;
        }
    }
    else{
        if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1 ) {
            res.status(500).json('برای انجام این کار، نیاز به دسترسی ادمین دارید!');
            return;
        }
    }
    //console.log(req.file)
    //console.log(req.body)

    bst.insert(req.params.table, req.body).then((result) => {
            //console.log('inserted')
            if (typeof req.file != 'undefined' && req.file) {
                let rnd = new Date().getTime();
                let path = `${__dirname}/files/${req.params.table}-${result.insertId}-${rnd}.jpg`;
                jimp.read(req.file.path).then( (lenna)=>{
                    lenna.resize(450, jimp.AUTO)
                        .quality(45)
                        .write(path, ()=>{
                            res.json(result);
                        });
                });
                //fs.renameSync(req.file.path, path);
                
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
    if (req.params.table == 'products' || req.params.table == 'users' || req.params.table == 'brands' || req.params.table == 'importers' || req.params.table == 'subgroups' || req.params.table == 'groups' || req.params.table == 'companies' || req.params.table == 'countries') {
        if (req.session == null) {
            res.status(500).json('اشکال در ایجاد سشن!');
            return;
        }
        if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1) {
            res.status(500).json('برای انجام این کار، نیاز به دسترسی ادمین دارید!');
            return;
        }
    }
    if( req.params.table == 'users' ){
        if( !req.params.password ){
            delete req.params.password;
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
    bst.update(req.params.table, req.body, filters).then((result) => {
            //console.log('inserted')
            if (typeof req.file != 'undefined' && req.file) {
                let rnd = new Date().getTime();
                let path = `${__dirname}/files/${req.params.table}-${filters.id}-${rnd}.jpg`;
                jimp.read(req.file.path).then( (lenna)=>{
                    lenna.resize(450, jimp.AUTO)
                        .quality(45)
                        .write(path, ()=>{
                            res.json(result);
                        });
                });
                //res.json(result);
            } else {
                res.json(result);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
});




app.post('/delete/:table/:filters', upload.single('file'), (req, res) => {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1) {
        res.status(500).json('لطفا اول وارد سیستم شوید!');
        return;
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
    bst.delete(req.params.table, filters).then((result) => {
        res.json(result);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});
app.get('/fix-uploaded', upload.single('file'), (req, res) => {
    let files = Finder.from(`${__dirname}/files/`).findFiles(`*.*`);
    let ret = [];
    let did = 0;
    let job = files.length;
    files.forEach( (file)=>{
        jimp.read( file ).then( (lenna)=>{
            lenna.resize(450, jimp.AUTO)
                .quality(45)
                .write(file, ()=>{
                    did++;
                    if( did == job ){
                        res.send('ok');
                    }
                });
        });
    });
    

});