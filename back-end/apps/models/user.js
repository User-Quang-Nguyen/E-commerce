var db = require("../common/database");
var q = require("q");
var conn = db.getConnection();
var mysql = require('mysql');
var jwt = require("jsonwebtoken");
const util = require('util');

// Chuyển đổi hàm conn.query thành hàm trả về Promise
const queryPromise = util.promisify(conn.query).bind(conn);

function createToken(data) {
    const payload = {
        id: data.id,
        email: data.email,
    }
    const secretKey = "jwtsecrect";
    const token = jwt.sign(payload, secretKey, { expiresIn: '1000h' });
    return token;
}

async function loginVerification(token) {
    const secretKey = "jwtsecrect";
    try {
        const result = await jwt.verify(token, secretKey, (err, decode) => {
            if (err) {
                return "Invalid token";
            } else {
                const info = {
                    'userID': decode.id,
                    'userEmail': decode.email,
                };
                // console.log("Xac thuc thanh cong");
                return info;
            }
        }
        )
        return result;
    }
    catch (error) {
        return "Invalid token";
    }
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

async function checkUser(user) {
    var email = user.email.toString();
    var password = user.password;

    var query = `SELECT id, email, password, user_type FROM users WHERE email= ? and password = ?`;
    query = mysql.format(query, [email, password]);
    try {
        var result = await queryPromise(query);
        if (result.length == 0) {
            return "Đăng nhập thất bại";
        }
        if (password != result[0].password) {
            return "Đăng nhập thất bại";
        }
        return result[0];
    }
    catch (err) {
        return "Đăng nhập thất bại";
    }
}

module.exports = {
    addUser: addUser,
    checkUser: checkUser,
    createToken: createToken,
    loginVerification: loginVerification,
}