const { json } = require("body-parser");
var data_md = require("../service/dataProcess");
var math_md = require('../service/math');

function getPriorityProducts(req, res) {
    var getPriorityProducts = `select * from product_category 
                            inner join product on product_category.product_id = product.id
                            inner join category on product_category.category_id = category.id 
                            inner join image on product_category.product_id = image.product_id
                            where category_name = "Nổi bật"
                            group by product.id;`;
    data_md.responseData(getPriorityProducts, req, res);
}

function getNormalProducts(req, res) {
    var getNormalProducts = `select * from product_category 
                            inner join product on product_category.product_id = product.id
                            inner join category on product_category.category_id = category.id 
                            inner join image on product_category.product_id = image.product_id
                            where category_name = "Thông dụng"
                            group by product.id;`;
    data_md.responseData(getNormalProducts, req, res);
}

function getCategories(req, res) {
    var getCategories = `Select id, category_name from category where category_type = 1`;
    data_md.responseData(getCategories, req, res);
}

function getProductById(req, res, id) {
    var getProductDetail = `Select * from product where id = ` + id;
    data_md.responseData(getProductDetail, req, res);
}

function getImageOfPro(req, res, id) {
    var getImage = `select * from image where product_id = ` + id;
    data_md.responseData(getImage, req, res);
}

function getInfoProduct(item, arr, data) {
    var getInfoProduct = `SELECT MIN(image.image) AS image, product.name, product.price, 
                        Category.category_name FROM product INNER JOIN image 
                        ON image.product_id = product.id INNER JOIN product_category 
                        ON product_category.product_id = product.id INNER JOIN Category 
                        ON Category.id = product_category.category_id 
                        WHERE product.id = ` + item.product_id + ` GROUP BY product.id;`;
    data_md.getData(getInfoProduct)
        .then((product) => {
            var total = math_md.mul(item.quantity, product[0].price);
            var productData = {
                id: item.id,
                image: product[0].image,
                name: product[0].name,
                price: product[0].price,
                category_name: product[0].category_name,
                quantity: item.quantity,
                total: total
            };
            arr.push(productData);
            if (arr.length === data.length) {
                return arr;
            }
        })
        .catch((error) => {
            return null;
        })
}

module.exports = {
    getPriorityProducts: getPriorityProducts,
    getNormalProducts: getNormalProducts,
    getCategories: getCategories,
    getProductById: getProductById,
    getImageOfPro: getImageOfPro,
    getInfoProduct: getInfoProduct
}