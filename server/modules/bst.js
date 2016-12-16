const fs = require('fs');
const mysql = require('mysql');
const qc = require('query-creator');
const db = mysql.createConnection(config.mysql);
db.connect();

module.exports.db = db;

module.exports.b64toFile = function(b64, path) {
    return new Promise((resolve, reject) => {
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
    let fields = ['id', 'username', 'alias','type'];
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
    if (table == 'users') {
        fields = [
                'id',
                'username',
                'alias',
                'type',
            ];
    }
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
module.exports.getAll = (table = 'users', filters = {}, limit = false) => {
    limit = limit ? limit : 99999;
    let query;
    let where = 'TRUE ';

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
    for (let i in filters) {
        let operator = '=';
        let prefix = '';
        if( ['name','model','code'].indexOf(i) !== -1 ){
            operator = 'LIKE';
            prefix = '%';
        }
        where += `AND \`${i}\` ${operator} '${prefix}${filters[i]}${prefix}' `;
    }
    if (table == 'products') {
        query = qc.new().select([
                'p.*',
                'i.alias AS industry_alias',
                'im.alias AS importer_alias',
                'g.alias AS group_alias',
                's.alias AS subgroup_alias',
                's.alias AS subgroup_alias',
                'ir.text AS country_alias',
                'b.alias AS brand_alias'
            ], 'products p')
            .leftJoin('industries i', 'p.industry = i.id')
            .leftJoin('importers im', 'p.importer = im.id')
            .leftJoin('groups g', 'p.group = g.id')
            .leftJoin('countries ir', 'p.country = ir.value')
            .leftJoin('brands b', 'p.brand = b.id')
            .leftJoin('subgroups s', 'p.subgroup = s.id')
            .where(where)
            .orderBy('`p`.`id`', 'DESC')
            .limit(0, limit)
            .val();
    } else if (table == 'messages') {
        query = qc.new().select([
                'm.*',
                'p.id AS product_id',
                'u.alias AS user_alias',
                'u.username AS user_username',
                'u.phone AS user_phone',
                'u.mobile AS user_mobile',
                'u.businessName AS user_businessName',
                'u.address AS user_address'
            ], 'messages m')
            .leftJoin('products p', 'p.code = m.product')
            .leftJoin('users u', 'u.id = m.user')
            .where(where).orderBy('id', 'DESC').val();
    } else if (table == 'users') {
        query = qc.new().select([
                'id',
                'username',
                'phone',
                'mobile',
                'businessName',
                'address',
                'alias',
                'type',
            ], 'users')
            .where(where).orderBy('id', 'DESC').val();
    } else {
        query = qc.new().select('*', table).where(where).orderBy('id', 'DESC').val();
    }


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
    if (typeof data.read != 'undefined') {
        data['`read`'] = data.read;
        delete data.read;
    }
    let query = qc.new().insert(table, data).val();
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
module.exports.update = (table = 'users', data={}, filters={})=>{
    if (typeof data.group != 'undefined') {
        data['`group`'] = data.group;
        delete data.group;
    }
    if (typeof data.read != 'undefined') {
        data['`read`'] = data.read;
        delete data.read;
    }
    let where = 'TRUE ';
    for (let i in filters) {
        where += `AND \`${i}\` = '${filters[i]}' `;
    }

    let query = qc.new().update(table, data).where(where).val();
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

module.exports.delete = (table = 'users', filters = {}) => {
    let where = 'TRUE ';
    for (let i in filters) {
        where += `AND \`${i}\` = '${filters[i]}' `;
    }
    let query = qc.new().delete(table).where(where).val();
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