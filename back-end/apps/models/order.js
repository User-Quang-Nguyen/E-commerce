var data_md = require('../service/dataProcess')

async function insertOrder(userId) {
    try {
        var getData = `select cart.user_id, SUM(product.price*cart.quantity) AS total, current_timestamp() AS created_at
                from cart inner join product 
                on cart.product_id = product.id 
                where cart.user_id=` + userId + ` 
                group by cart.user_id`;
        // get additional data for the order table
        var result = await data_md.getData(getData);
        var total_money = result[0].total + result[0].total * 0.1;
        var time = result[0].created_at.toString();

        // add data to order table
        var insert = `Insert into orders(user_id, total_money, created_at) 
                    values(` + result[0].user_id + `,` + total_money + `,` + `"` + time + `"` + `)`;
        var result1 = await data_md.getData(insert);

        // get additional data for the list_order table
        var insertListOrder = `select orders.id as order_id, cart.product_id, cart.quantity, product.name, product.price
                                from cart inner join orders on orders.user_id = cart.user_id
                                inner join product on cart.product_id = product.id
                                where orders.id =`+ result1.insertId;
        var result2 = await data_md.getData(insertListOrder);

        // add data to list_order table
        result2.map(async (item) => {
            var query = `Insert into list_orders(order_id, product_id, quantity, name, price)
                        values(`+ item.order_id + `,` + item.product_id + `,` + item.quantity + `,"` +
                item.name + `",` + item.price + `)`;
            var res = await data_md.getData(query);
        })
    } catch (e) {
        res.status(500).json("Insert table failed");
    }
}

async function getOrderInfo(userId, req, res) {
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
        var result = await data_md.getData(getOrderInfo);
        var data = [];
        result.map((item) => {
            newData = {
                key: item.k,
                total: item.total,
                created_at: item.created_at,
                secondLevel: Array.from(JSON.parse(item.secondLevel))
            }
            data.push(newData);
        })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json("Error");
    }
}

module.exports = {
    insertOrder: insertOrder,
    getOrderInfo: getOrderInfo,
}