var data_md = require('../models/product');

function responseData(query, req, res) {
    data_md.getData(query)
        .then((data) => {
            res.json(data);
            // console.log(data);
        })
        .catch((error) => {
            res.status(401).json({ success: false, message: error });
        })
}

module.exports = {
    responseData: responseData,
}