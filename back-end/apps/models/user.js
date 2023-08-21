var db = require("../common/database");
var conn = db.getConnection();
var mysql = require('mysql');
var util = require('util');
var queryProcess = require('../utils/queryProcess')

// Chuyển đổi hàm conn.query thành hàm trả về Promise
const queryPromise = util.promisify(conn.query).bind(conn);

function registerUser(user) {
    const query = `INSERT INTO users SET ?`;
    conn.query(query, user, (err, result) => {
        if (err) return false;
        return true;
    });
};

async function loginUser(user) {
    var email = user.email.toString();
    var password = user.password;

    var query = `SELECT id, email, password, user_type FROM users WHERE email= ? and password = ?`;
    query = mysql.format(query, [email, password]);
    try {
        var result = await queryPromise(query);
        if (result.length == 0 || password != result[0].password) {
            return "Đăng nhập thất bại";
        }
        return result[0];
    }
    catch (err) {
        return "Đăng nhập thất bại";
    }
}

function getUserById(id) {
    var getUserById = `Select id, first_name, last_name, date_of_birth, phone_number, city, address, gender from users where id = ${id}`;
    return queryProcess.executeQuery(getUserById);
}

module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
    getUserById: getUserById
}