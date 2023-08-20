const { json } = require("body-parser");
var queryProcess = require("../utils/queryProcess");

function getPriorityProducts() {
    var getPriorityProducts = `select * from product_category 
                            inner join product on product_category.product_id = product.id
                            inner join category on product_category.category_id = category.id 
                            inner join image on product_category.product_id = image.product_id
                            where category_name = "Nổi bật"
                            group by product.id;`;
    return queryProcess.executeQuery(getPriorityProducts);
}

function getNormalProducts() {
    var getNormalProducts = `select * from product_category 
                            inner join product on product_category.product_id = product.id
                            inner join category on product_category.category_id = category.id 
                            inner join image on product_category.product_id = image.product_id
                            where category_name = "Thông dụng"
                            group by product.id;`;
    return queryProcess.executeQuery(getNormalProducts);
}

function getProductById(id) {
    var getProductDetail = `Select * from product where id = ${id}`;
    return queryProcess.executeQuery(getProductDetail);
}

function getProductImage(id) {
    var getImage = `select * from image where product_id = ${id}`;
    return queryProcess.executeQuery(getImage);
}

async function getInfoProduct(item) {
    var getInfoProductQuery = `SELECT MIN(image.image) AS image, product.name, product.price, 
                        Category.category_name FROM product INNER JOIN image 
                        ON image.product_id = product.id INNER JOIN product_category 
                        ON product_category.product_id = product.id INNER JOIN Category 
                        ON Category.id = product_category.category_id 
                        WHERE product.id = ${item.product_id} GROUP BY product.id;`;
    const product = await queryProcess.executeQuery(getInfoProductQuery);
    return product[0];
}

module.exports = {
    getPriorityProducts: getPriorityProducts,
    getNormalProducts: getNormalProducts,
    getProductById: getProductById,
    getProductImage: getProductImage,
    getInfoProduct: getInfoProduct
}