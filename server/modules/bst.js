const fs = require('fs');
const mysql = require('mysql');
const qc = require('query-creator');
const db = mysql.createConnection(config.mysql);
db.connect();

module.exports.db = db;

module.exports.b64toFile = function(b64, path) {
    return new Promise((resolve, reject) => {
        //let temp = `./tmp/${module.exports.uniqueName()}`;
        //console.log(temp);
        b64 = b64.replace(/^data:image\/jpg;base64,/, "");
        b64 = b64.replace(/^data:image\/png;base64,/, "");
        b64 = b64.replace(/^data:image\/jpeg;base64,/, "");
        fs.writeFile(path, b64, 'base64', function(err) {
            console.log('end');
            console.log(err);
            if (!err) {
                resolve();
            } else {
                reject(err);
            }
        });

    });
}

module.exports.hi = () => {
    return 'Hi Baby :)';
}

module.exports.users = (id = false, password = false) => {
    let query;
    let fields = ['id', 'username', 'alias'];
    let table = 'users';

    let field = 'username';
    if (parseInt(id).toString() == id.toString()) {
        field = 'id';
    }
    if (password === false) {
        query = qc.new().select(fields, table).where(`${field} = '${id}'`).val();
    } else {
        query = qc.new().select(fields, table).where(`${field} = '${id}' AND password = '${password}'`).val();
    }

    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
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
}

module.exports.get = (table = 'users', id = 1, fields = ['*']) => {
    let query;

    query = qc.new().select(fields, table).where('id = ?', [id]).val();

    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else if (result.length == 0) {
                reject('چیزی پیدا نشد!')
            } else {
                resolve(result[0]);
            }
        });
    });
}
module.exports.getAll = (table = 'users', fields = ['*']) => {
    let query;

    query = qc.new().select(fields, table).val();

    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
module.exports.insert = (table = 'users', data = {}) => {
    if (typeof data.group != 'undefined') {
        data['`group`'] = data.group;
        delete data.group;
    }
    let query = qc.new().insert(table, data).val();
    //console.log(query);
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}