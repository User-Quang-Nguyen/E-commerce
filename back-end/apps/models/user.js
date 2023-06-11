// const { connect } = require("../controller/admin");
var db = require("../common/database");
var q = require("q");
var conn = db.getConnection();
var mysql = require('mysql');

function addUser(user) {
    if (user) {
        var query = conn.query('INSERT INTO users SET ?', user, function (err, result) {
            if (err) throw err;
            else {
                console.log("Đăng kí thành công");
            }
        });
    }
}

function checkUser(user) {
    //     "email": "any\" and password= 1 or 1; -- ",
    return new Promise((resolve, reject) => {
        var email = user.email.toString();
        var password = user.password;
        
        var query = `SELECT email, password FROM users WHERE email= ? and password = ?`;
        query = mysql.format(query, [email, password]);
        console.log(query);
        var connect = conn.query(query, function (err, result) {
            // console.log(result);
            if (err) {
                reject(err);
            }
            if (result.length === 0) {
                reject("Đăng nhập thất bại");
            } else {
                if (password == result[0].password) {
                    resolve("Đăng nhập thành công");
                } else {
                    reject("Đăng nhập thất bại");
                }
            }
        });
    });
}

module.exports = {
    addUser: addUser,
    checkUser: checkUser
}