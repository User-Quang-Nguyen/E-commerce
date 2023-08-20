var queryProcess = require('../utils/queryProcess');

function getCategories() {
    var getCategories = `Select id, category_name from category where category_type = 1`;
    return queryProcess.executeQuery(getCategories);
}

module.exports = {
    getCategories: getCategories,
}