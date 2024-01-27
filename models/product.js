const { DataTypes } = require('sequelize');
const { sequelize } = require('./../inc/databaseConection');

const Category = sequelize.define('category',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thumbnail: DataTypes.STRING,
        slug: {
            type: DataTypes.STRING,
            unique: true,
            sparse: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

const SubCategory = sequelize.define('sub_category',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
            sparse: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

const Product = sequelize.define('product',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        short_desc: {
            type: DataTypes.TEXT,
            validate: {
                len: [1, 1000]
            }
        },
        desc: {
            type: DataTypes.TEXT,
            validate: {
                len: [1, 2000]
            }
        },
        slug: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 200]
            },
            unique: true,
            sparse: true
        },
        subcategoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: SubCategory,
                key: 'id'
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        },
        thumbnail: DataTypes.STRING,
        quantity: {
            type: DataTypes.STRING,
            maxlength: 50
        },
        final_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: DataTypes.INTEGER,
        discounted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        trend: {
            type: DataTypes.ENUM('0', '1', '2'),
            defaultValue: '0'
        }
    },
    {
        timestamps: true
    }
);

// Associations
Category.hasMany(Product, { foreignKey: 'categoryId' });
Category.hasMany(SubCategory, { foreignKey: 'categoryId', as: 'subcategory'});
SubCategory.hasMany(Product, { foreignKey: 'subcategoryId' });
SubCategory.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Product.belongsTo(SubCategory, { foreignKey: 'subcategoryId', as: 'subcategory' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// sequelize.sync( {alter:true} );

module.exports = {
    Category, SubCategory, Product
};
