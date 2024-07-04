function select(param1, param2, param3 = "") {
    return new Promise((resolve, reject) => {
        const mysql = require("mysql2");
        var Pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "123456789",
            database: "fish_1",
            port: 3306,
            connectionLimit: 10,
        });
        Pool.getConnection((err, connection) => {
            if (err) reject(err);
            let sql;
            if (param3 == "") {
                sql = `SELECT ${param1} FROM ${param2}`;
            } else {
                sql = `SELECT ${param1} FROM ${param2}  ${param3}`;
            }
            connection.query(sql, (err, rows) => {
                connection.release();

                if (!err) {
                    const jsonData = JSON.stringify(rows);
                    resolve(jsonData);
                } else reject(err);
            });
        });
    });
}

function insert(table, columns, values) {
    return new Promise((resolve, reject) => {
        const mysql = require("mysql2");
        var Pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "123456789",
            database: "fish_1",
            port: 3306,
            connectionLimit: 10,
        });
        Pool.getConnection((err, connection) => {
            if (err) reject(err);
            const sql = `INSERT INTO ${table} (${columns}) VALUES (${values
                .map(() => "?")
                .join(", ")})`;
            connection.query(sql, values, (err, result) => {
                connection.release();

                if (!err) resolve({ success: true });
                else reject(err);
            });
        });
    });
}

module.exports = {
    select: select,
    insert: insert,
};
