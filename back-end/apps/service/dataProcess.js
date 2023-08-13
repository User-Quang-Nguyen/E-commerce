var db = require('../common/database');
var conn = db.getConnection();

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

function responseData(query, req, res) {
    getData(query)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(401).json({ success: false, message: error });
        })
}

module.exports = {
    getData: getData,
    responseData: responseData
}