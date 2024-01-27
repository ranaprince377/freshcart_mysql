const express = require('express');
const router = express.Router();
const {getProductDetails, getProductsBySubcategoryId, getCategoryPageData} = require('../controllers/productController');
const { trends } = require('./../inc/eum');

router.get('/details/:product_slug', (req, res) => {
    const product_slug = req.params.product_slug;
    res.locals.title = 'Details';
    
    getProductDetails(product_slug).then((product) => {
        getProductsBySubcategoryId(product.subcategory.id).then((related_products)=>{
            // res.send(related_products)
            res.render('productDetails', {'product': product, 'trends': trends, 'product_qty': 1, 'related_products': related_products});
        });
    });
});

router.get('/category/:cat_slug/:subcat_slug?', (req, res) => {
    const subcat_slug = req.params.subcat_slug || null;
    const cat_slug = req.params.cat_slug;

    getCategoryPageData(cat_slug, subcat_slug).then((data) => {
        // res.send( data );
        res.locals.title = data.category.name;
        res.render('category', data);
    });    
});

router.post('/add', (req, res) => {
    res.send('hi');
});

router.patch('/update', (req, res) => {
    res.send('hi');
});

router.delete('/delete', (req, res) => {
    res.send('hi');
});

module.exports = router;