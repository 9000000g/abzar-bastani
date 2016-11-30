'use strict';

var fs = require('fs');
var mysql = require('mysql');
var qc = require('query-creator');
var db = mysql.createConnection(config.mysql);
db.connect();

module.exports.db = db;

module.exports.b64toFile = function (b64, path) {
    return new Promise(function (resolve, reject) {
        b64 = b64.replace(/^data:image\/jpg;base64,/, "");
        b64 = b64.replace(/^data:image\/png;base64,/, "");
        b64 = b64.replace(/^data:image\/jpeg;base64,/, "");
        fs.writeFile(path, b64, 'base64', function (err) {
            console.log('end');
            console.log(err);
            if (!err) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
};

module.exports.hi = function () {
    return 'Hi Baby :)';
};

module.exports.users = function () {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var query = void 0;
    var fields = ['id', 'username', 'alias'];
    var table = 'users';

    var field = 'username';
    if (parseInt(id).toString() == id.toString()) {
        field = 'id';
    }
    if (password === false) {
        query = qc.new().select(fields, table).where(field + ' = \'' + id + '\'').val();
    } else {
        query = qc.new().select(fields, table).where(field + ' = \'' + id + '\' AND password = \'' + password + '\'').val();
    }

    return new Promise(function (resolve, reject) {
        db.query(query, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.length == 0) {
                    reject('اطلاعات کاربری اشتباه است!');
                } else {
                    resolve(result[0]);
                }
            }
        });
    });
};

module.exports.get = function () {
    var table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'users';
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['*'];

    var query = void 0;
    if (table == 'users') {
        fields = ['id', 'username', 'alias', 'type'];
    }
    query = qc.new().select(fields, table).where('id = ?', [id]).val();

    return new Promise(function (resolve, reject) {
        db.query(query, function (err, result) {
            if (err) {
                reject(err);
            } else if (result.length == 0) {
                reject('چیزی پیدا نشد!');
            } else {
                resolve(result[0]);
            }
        });
    });
};
module.exports.getAll = function () {
    var table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'users';
    var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    limit = limit ? limit : 99999;
    var query = void 0;
    var where = 'TRUE ';

    if (table == 'products') {
        if (filters.id) {
            filters['p`.`id'] = filters.id;
            delete filters.id;
        }
    } else if (table == 'messages') {
        if (filters.id) {
            filters['m`.`id'] = filters.id;
            delete filters.id;
        }
    }
    for (var i in filters) {
        where += 'AND `' + i + '` = \'' + filters[i] + '\' ';
    }
    if (table == 'products') {
        query = qc.new().select(['p.*', 'i.alias AS industry_alias', 'im.alias AS importer_alias', 'g.alias AS group_alias', 's.alias AS subgroup_alias', 's.alias AS subgroup_alias', 'ir.text AS country_alias', 'b.alias AS brand_alias'], 'products p').leftJoin('industries i', 'p.industry = i.id').leftJoin('importers im', 'p.importer = im.id').leftJoin('groups g', 'p.group = g.id').leftJoin('countries ir', 'p.country = ir.value').leftJoin('brands b', 'p.brand = b.id').leftJoin('subgroups s', 'p.subgroup = s.id').where(where).orderBy('`p`.`id`', 'DESC').limit(0, limit).val();
    } else if (table == 'messages') {
        query = qc.new().select(['m.*', 'p.id AS product_id'], 'messages m').leftJoin('products p', 'p.code = m.product').where(where).orderBy('id', 'DESC').val();
    } else if (table == 'users') {
        query = qc.new().select(['id', 'username', 'alias', 'type'], 'users').where(where).orderBy('id', 'DESC').val();
    } else {
        query = qc.new().select('*', table).where(where).orderBy('id', 'DESC').val();
    }

    return new Promise(function (resolve, reject) {
        db.query(query, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
module.exports.insert = function () {
    var table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'users';
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof data.group != 'undefined') {
        data['`group`'] = data.group;
        delete data.group;
    }
    var query = qc.new().insert(table, data).val();
    return new Promise(function (resolve, reject) {
        db.query(query, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
