var db = require("../common/database");
var conn = db.getConnection();
var mysql = require('mysql');
var util = require('util');
var data_md = require('../service/dataProcess')

// Chuyển đổi hàm conn.query thành hàm trả về Promise
const queryPromise = util.promisify(conn.query).bind(conn);

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

function getUserById(req, res, id){
    var getUserById = `Select id, first_name, last_name, date_of_birth, phone_number, city, address, gender from users where id = ${id}`;
    data_md.responseData(getUserById, req, res);
}

module.exports = {
    addUser: addUser,
    checkUser: checkUser,
    getUserById: getUserById
}