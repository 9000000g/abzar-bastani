"use strict";

global.config = require('./config.json');

var express = require('express');
var cors = require('cors-express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var ses = require('se-session');
var multer = require('multer');
var Finder = require('fs-finder');

var jimp = require('jimp');

var upload = multer({
    dest: __dirname + '/tmp/',
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    }
});

var bst = require('./modules/bst.js.js');

var app = express();

app.use(ses.express({ required: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(config.server.port);
console.log('listening to ' + config.server.address + ':' + config.server.port);
app.post('/login', upload.array(), function (req, res) {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (!req.body.username || !req.body.password) {
        res.status(500).json('اطلاعات ورودی اشتباه است!');
        return;
    }
    req.session.me = false;
    bst.users(req.body.username, req.body.password).then(function (result) {
        req.session.me = result;
        res.json(result);
    }).catch(function (error) {
        res.status(500).json(error);
    });
});
app.post('/logout', upload.array(), function (req, res) {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    req.session.me = false;
    res.json(true);
});

app.get('/hi', function (req, res) {
    res.json(true);
});

app.get('/users/:id', function (req, res) {
    var id = req.params.id;
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
    bst.users(id).then(function (result) {
        res.json(result);
    }).catch(function (error) {
        res.status(500).json('اشکال در بازیابی اطلاعات!');
    });
});

app.get('/get-all/:table/:filters?/:limit?', function (req, res) {
    var filters = {};
    if (req.params.filters) {
        var spl = req.params.filters.split('&');

        for (var i in spl) {
            var keyval = spl[i].split('=');
            if (keyval.length == 2) {
                filters[keyval[0]] = keyval[1];
            }
        }
    }
    bst.getAll(req.params.table, filters, req.params.limit).then(function (result) {
        for (var i in result) {
            result[i].files = bst.getFiles(req.params.table, result[i].id, true);
        }
        res.json(result);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json('اشکال در بازیابی اطلاعات!');
    });
});

app.get('/get/:table/:id', function (req, res) {
    var filters = {
        id: req.params.id
    };
    bst.getAll(req.params.table, filters).then(function (result) {
        for (var i in result) {
            result[i].files = bst.getFiles(req.params.table, result[i].id, true);
        }
        res.json(result[0]);
    }).catch(function (error) {
        res.status(500).json('اشکال در بازیابی اطلاعات!');
    });
});

app.post('/add-file/:table/:id', upload.single('file'), function (req, res) {
    if (req.params.table == 'messages' || req.params.table == 'userproducts') {// mikhad user add kone o typesh 1 nist
        // let do this
    } else {
        if (req.session == null) {
            res.status(500).json('اشکال در ایجاد سشن!');
            return;
        }
        if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1) {
            res.status(500).json('لطفا اول وارد سیستم شوید!');
            return;
        }
    }
    //fs.unlinkSync
    if (typeof req.file != 'undefined' && req.file) {
        var rnd = new Date().getTime();
        var _path = __dirname + '/files/' + req.params.table + '-' + req.params.id + '-' + rnd + '.jpg';
        jimp.read(req.file.path).then(function (lenna) {
            lenna.resize(450, jimp.AUTO).quality(45).write(_path, function () {
                res.json('با موفقیت آپلود شد');
            });
        });
    } else {
        res.status(500).json('اشکال در آپلود فایل!');
    }
});
app.get('/get-files/:table/:id', function (req, res) {
    res.json(bst.getFiles(req.params.table, req.params.id));
});
app.get('/get-file/:table/:id/:index', function (req, res) {
    var file = __dirname + '/files/' + req.params.table + '-' + req.params.id + '-' + req.params.index + '.jpg';
    if (fs.existsSync(file)) {
        res.sendFile(file);
    } else {
        res.sendFile(__dirname + '/files/notfound.jpg');
    }
});
app.post('/delete-file/:table/:id/:index', function (req, res) {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1) {
        res.status(500).json('لطفا اول وارد سیستم شوید!');
        return;
    }
    var file = __dirname + '/files/' + req.params.table + '-' + req.params.id + '-' + req.params.index + '.jpg';
    if (fs.existsSync(file)) {
        var ret = fs.unlinkSync(file);
        if (ret) {
            res.json('با موفقیت حذف شد');
        } else {
            res.status(500).json('اشکال در حذف فایل');
        }
    } else {
        res.status(500).json('فایل درخواستی در سیستم موجود نیست');
    }
});

app.get('/get-file/:table/:id/', function (req, res) {
    var basedir = __dirname + '/files';
    var file = basedir + '/' + req.params.table + '-' + req.params.id + '.jpg';
    if (fs.existsSync(file)) {
        res.sendFile(file);
    } else {
        res.sendFile(basedir + '/notfound.jpg');
    }
});
app.post('/insert/:table', upload.single('file'), function (req, res) {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (req.params.table == 'products' && req.session.me !== false) {
        if ([3, 4, 5, 6].indexOf(req.session.me.type) != -1) {
            req.body.confirmed = 0;
        } else {
            req.body.confirmed = 1;
        }
    } else if (req.params.table == 'messages' || req.params.table == 'userproducts' || req.params.table == 'users' && req.body.type != 1) {
        // mikhad user add kone o typesh 1 nist
        if (req.params.table == 'messages') {
            req.body.user = req.session.me.id;
            req.body.read = 0;
        }
    } else {
        if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1) {
            res.status(500).json('برای انجام این کار، نیاز به دسترسی ادمین دارید!');
            return;
        }
    }
    //console.log(req.file)
    //console.log(req.body)

    bst.insert(req.params.table, req.body).then(function (result) {
        //console.log('inserted')
        if (typeof req.file != 'undefined' && req.file) {
            var rnd = new Date().getTime();
            var _path2 = __dirname + '/files/' + req.params.table + '-' + result.insertId + '-' + rnd + '.jpg';
            jimp.read(req.file.path).then(function (lenna) {
                lenna.resize(450, jimp.AUTO).quality(45).write(_path2, function () {
                    res.json(result);
                });
            });
            //fs.renameSync(req.file.path, path);
        } else {
            res.json(result);
        }
    }).catch(function (error) {
        console.log('ERROR', error.errno);
        if (error.errno == 1062) {
            res.status(500).json('این مشخصات قبلا ثبت شده.');
        } else if (error.errno == 1062) {
            res.status(500).json('نوع اطلاعات وارد شده صحیح نیست.');
        } else {
            res.status(500).json(error);
        }
    });
});
app.post('/update/:table/:filters', upload.single('file'), function (req, res) {
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
    if (req.params.table == 'users') {
        if (!req.params.password) {
            delete req.params.password;
        }
    }
    var filters = {};
    if (req.params.filters) {
        var spl = req.params.filters.split('&');

        for (var i in spl) {
            var keyval = spl[i].split('=');
            if (keyval.length == 2) {
                filters[keyval[0]] = keyval[1];
            }
        }
    }
    bst.update(req.params.table, req.body, filters).then(function (result) {
        //console.log('inserted')
        if (typeof req.file != 'undefined' && req.file) {
            var rnd = new Date().getTime();
            var _path3 = __dirname + '/files/' + req.params.table + '-' + filters.id + '-' + rnd + '.jpg';
            jimp.read(req.file.path).then(function (lenna) {
                lenna.resize(450, jimp.AUTO).quality(45).write(_path3, function () {
                    res.json(result);
                });
            });
            //res.json(result);
        } else {
            res.json(result);
        }
    }).catch(function (error) {
        console.log('ERROR', error.errno);
        if (error.errno == 1062) {
            res.status(500).json('این مشخصات قبلا ثبت شده.');
        } else if (error.errno == 1062) {
            res.status(500).json('نوع اطلاعات وارد شده صحیح نیست.');
        } else {
            res.status(500).json(error);
        }
    });
});

app.post('/delete/:table/:filters', upload.single('file'), function (req, res) {
    if (req.session == null) {
        res.status(500).json('اشکال در ایجاد سشن!');
        return;
    }
    if (typeof req.session.me == 'undefined' || req.session.me === false || req.session.me.type != 1) {
        res.status(500).json('لطفا اول وارد سیستم شوید!');
        return;
    }
    var filters = {};
    if (req.params.filters) {
        var spl = req.params.filters.split('&');
        for (var i in spl) {
            var keyval = spl[i].split('=');
            if (keyval.length == 2) {
                filters[keyval[0]] = keyval[1];
            }
        }
    }
    bst.delete(req.params.table, filters).then(function (result) {
        res.json(result);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error);
    });
});
app.get('/fix-uploaded', upload.single('file'), function (req, res) {
    var files = Finder.from(__dirname + '/files/').findFiles('*.*');
    var ret = [];
    var did = 0;
    var job = files.length;
    files.forEach(function (file) {
        jimp.read(file).then(function (lenna) {
            lenna.resize(450, jimp.AUTO).quality(45).write(file, function () {
                did++;
                if (did == job) {
                    res.send('ok');
                }
            });
        });
    });
});
