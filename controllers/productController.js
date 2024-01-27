const { Category, SubCategory, Product } = require("./../models/product");

async function getProductDetails(product_slug){
    const product = await Product.findAll({
        where: {
            slug: product_slug
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
    return product[0];
}

async function getProductsBySubcategoryId(subCatId){
    const product = await Product.findAll({
        where: {
            subcategoryId: subCatId
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

    return product;
}

async function getProductsByCategoryId(catId){
    const product = await Product.findAll({
        where: {
            categoryId: catId
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

    return product;
}

async function getCategoryPageData(cat_slug, subcat_slug = null){
    const category = await Category.findOne({
        where: {slug: cat_slug}
    });

    const subCategoryList = await SubCategory.findAll({
        where: {categoryId: category.id}
    });

    let product = [];
    let subCategoryName = null;

    if(subcat_slug){
        const subCategory = await SubCategory.findOne({
            where: {slug: subcat_slug}
        });

        subCategoryName = subCategory.name;

        product = await getProductsBySubcategoryId(subCategory.id);
    }
    else{
        product = await getProductsByCategoryId(category.id);
    }

    response = {
        'category': category,
        'subCategoryName': subCategoryName,
        'product': product,
        'total_product': product.length,
        'subCategoryList': subCategoryList
    }
    return response;
}

module.exports = {
    getProductDetails,
    getProductsBySubcategoryId,
    getCategoryPageData
}