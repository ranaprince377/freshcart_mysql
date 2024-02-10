const { DataTypes } = require('sequelize');
const { sequelize } = require('./../inc/databaseConection');
const { Product } =require('./product');

// User model
const User = sequelize.define('user',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: 'User with same email already exists.'
            },
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Seems you have entered a wrong email. Please enter correct email.'
                }
            }
        },
        password: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
        last_login: DataTypes.DATE
    },
    {
        timestamps: true
    }
);

// Address Model
const Address = sequelize.define('address',
    {
        user: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }

        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 50],
            }
        },
        mobile_no: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address_line1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 150]
            }
        },
        address_line2: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 150]
            }
        },
        landmark: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 150]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pincode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('1', '2', '3'),
            defaultValue: '3'
        },
        is_default: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true,
        timestamps: true
    }
);

// CartItem Model
const CartItem = sequelize.define('cart_item',
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id'
            }
        },
        qty: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        timestamps: true
    }
);

// Wishlist Model
const Wishlist = sequelize.define('wishlist',
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id'
            }
        },
        qty: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    },
    {
        timestamps: true
    }
);

// Order Model
const Order = sequelize.define('order',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        instructions: DataTypes.STRING,
        total_amount: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        payment_mode: {
            type: DataTypes.ENUM('1', '2', '3'),
            defaultValue: '1'
        }
    }
);

// OrderItem Model
const OrderItem = sequelize.define('order_item',
    {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Order,
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id'
            }
        },
        qty: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7'),
            defaultValue: '1'
        }
    },
    {
        timestamps: false
    }
);

User.hasMany(Address, { foreignKey: 'user' });

// sequelize.sync({ alter: true });

module.exports = { User, Address, CartItem, Wishlist, Order, OrderItem };
