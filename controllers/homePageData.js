const { Category, Product, SubCategory} = require("./../models/product");
const { trends } = require('./../inc/eum');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

async function getHomePageData(req, res){
    const products = await Product.findAll({
        where: { 
            trend: {
                [op.not] : '0'
            } 
        },
        include: [
            {
                model: SubCategory,
                as: 'subcategory',
                include: [
                    {
                        model: Category,
                        as: 'category'
                    }
                ]
            }
        ]
    });
    
    const featured_cat = await Category.findAll();
    var data = { 
        wishlistTotalItems: 5,
        cartTotalItems: 3,
        products: products,
        trends: trends,
        featured_cat: featured_cat
    };

    return data;
}

module.exports = { getHomePageData }