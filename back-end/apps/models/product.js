var db = require('../common/database');
var conn = db.getConnection();

// get list of products with input of 1 query
function getData(query) {
    return new Promise((resolve, reject) => {
        conn.query(query, function (err, result) {
            if (err) reject(err);
            else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    getData: getData,
}