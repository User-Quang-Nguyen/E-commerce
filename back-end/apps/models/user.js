// const { connect } = require("../controller/admin");
var db = require("../common/database");
var q = require("q");
var conn = db.getConnection();
var mysql = require('mysql');
var jwt = require("jsonwebtoken");

function createToken(data) {
    const payload = {
        id: data.id,
        email: data.email,
        userType: data.user_type,
    }
    const secretKey = "jwtsecrect";
    const token = jwt.sign(payload, secretKey, { expiresIn: '1000h' });
    return token;
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        // console.log(token);
        const secretKey = "jwtsecrect";
        jwt.verify(token, secretKey, (err, decode) => {
            if (err) {
                reject("Invalid token");
            } else {
                const info = {
                    'userID' : decode.id,
                    'userEmail' : decode.email,
                    'userType' : decode.userType,
                };
                console.log("Xac thuc thanh cong");
                resolve(info);
            }
        });
    })

}

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
    return new Promise((resolve, reject) => {
        var email = user.email.toString();
        var password = user.password;

        var query = `SELECT id, email, password, user_type FROM users WHERE email= ? and password = ?`;
        query = mysql.format(query, [email, password]);
        var connect = conn.query(query, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length === 0) {
                reject("Đăng nhập thất bại");
            } else {
                if (password == result[0].password) {
                    // console.log(result[0]);
                    resolve(result[0]);
                } else {
                    reject("Đăng nhập thất bại");
                }
            }
        });
    });
}

module.exports = {
    addUser: addUser,
    checkUser: checkUser,
    createToken: createToken,
    verifyToken: verifyToken,
}