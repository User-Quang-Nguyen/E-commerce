const { json } = require('body-parser');
var db = require('../common/database');
var conn = db.getConnection();

function getDataPriority() {
    return new Promise((resolve, reject) => {
        var query = `Select id, name, price, image from product where priority = 1`;
        var query = conn.query(query, function (err, result) {
            if(err) reject(err);
            else{
                console.log(typeof result);
                var results = JSON.stringify(result);
                resolve(result);
            }
        });
    });
}

function getRandom() {
    return new Promise((resolve, reject) => {
        var query = `Select id, name, price, image from product where priority <> 1`;
        var query = conn.query(query, function(err, result){
            if(err) reject(err);
            else{
                var results = JSON.stringify(result);
                resolve(results);
            }
        })
    })
}

module.exports = {
    getDataPriority: getDataPriority,
    getRandom : getRandom
}