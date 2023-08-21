var db = require("../common/database");
var conn = db.getConnection();
var queryProcess = require('../utils/queryProcess');

function insertOrderTable(form) {
    try {
        const query = `INSERT INTO orders(user_id, total_money, created_at) VALUES(${form.user_id}, ${form.total_money}, ${form.created_at})`;
        return queryProcess.executeQuery(query);
    } catch (e) {
        return e;
    }
}

function insertListOrderTable(form) {
    try {
        const query = `INSERT INTO list_orders(order_id, product_id, quantity, name, price) VALUES(${form.order_id}, ${form.product_id}, ${form.quantity},"${form.name}", ${form.price})`;
        return queryProcess.executeQuery(query);
    } catch (e) {
        return e;
    }
}

function getOrderTableInfo(userId) {
    try {
        var orderTableInfo = `select cart.user_id, SUM(product.price*cart.quantity) AS total, current_timestamp() AS created_at
                from cart inner join product 
                on cart.product_id = product.id 
                where cart.user_id= ${userId}
                group by cart.user_id`;
        return queryProcess.executeQuery(orderTableInfo);
    } catch (e) {
        return e;
    }
}

function getListOrderTableInfo(orderId, userId) {
    try {
        var listOrderTableInfo = `select ${orderId} as order_id, cart.product_id, cart.quantity, product.name, product.price 
                                from cart inner join product on cart.product_id = product.id
                                where user_id = ${userId}`;
        return queryProcess.executeQuery(listOrderTableInfo);
    } catch (e) {
        return e;
    }
}

async function getOrderInfo(userId) {
    try {
        var getOrderInfo = `SELECT orders.id AS k,
                        orders.total_money AS total,
                        orders.created_at AS created_at,
                        CONCAT('[', GROUP_CONCAT(
                        CONCAT(
                            '{"key":', list_orders.id,
                            ',"name":"', list_orders.name,
                            '","price":', list_orders.price,
                            ',"quantity":', list_orders.quantity,
                        '}'
                        )), ']') AS secondLevel
                        FROM orders
                        INNER JOIN list_orders
                        ON list_orders.order_id = orders.id
                        WHERE orders.user_id = ${userId}
                        GROUP BY orders.id`;
        return queryProcess.executeQuery(getOrderInfo);
    } catch (e) {
        return e;
    }
}

module.exports = {
    insertOrderTable: insertOrderTable,
    insertListOrderTable: insertListOrderTable,
    getOrderTableInfo: getOrderTableInfo,
    getListOrderTableInfo: getListOrderTableInfo,
    getOrderInfo: getOrderInfo,
}