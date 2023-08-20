var db = require('../common/database');
var conn = db.getConnection();

function executeQuery(query) {
    return new Promise((resolve, reject) => {
        conn.query(query, function (err, result) {
            if (err) reject(err);
            else {
                resolve(result);
            }
        });
    });
}

function responseData(query, req, res) {
    executeQuery(query)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return false;
        })
}

module.exports = {
    executeQuery: executeQuery,
    responseData: responseData
}