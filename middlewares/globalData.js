const { Category, SubCategory} = require('../models/product');

async function getGlobalCategoryList(req, res, next){
    const global_categories = await Category.findAll({
        include: [
            {
                model: SubCategory,
                as: 'subcategory'
            }
        ]
    });
    
    res.locals.global_categories = global_categories;
    next();
}

module.exports = {
    getGlobalCategoryList
}