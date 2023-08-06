var data_md = require('../service/dataProcess')
var math_md = require('../service/math')
var product_md = require('../models/product')

function getCartById(req, res, id) {
    var getCartById = `Select id, product_id, quantity from cart where user_id =` + id;
    data_md.getData(getCartById)
        .then((data) => {
            var productDetail = [];
            data.map((item) => {
                var respo = product_md.getInfoProduct(item, productDetail, data);
                if (respo != null) {
                    res.json(respo);
                } else {
                    res.status(500).json({ message: false });
                }
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = {
    getCartById: getCartById,
}