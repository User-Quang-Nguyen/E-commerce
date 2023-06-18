var db = require('../common/database');
var conn = db.getConnection();

// get list of products with input of 1 query
function getProducts(query) {
    return new Promise((resolve, reject) => {
        conn.query(query, function (err, result) {
            if(err) reject(err);
            else{
                // console.log(result);
                resolve(result);
            }
        });
    });
}

module.exports = {
    getProducts : getProducts
}