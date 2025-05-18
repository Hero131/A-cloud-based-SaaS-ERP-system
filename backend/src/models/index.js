const User = require('./User');
const Branch = require('./Branch');
const Product = require('./Product');
const Customer = require('./Customer');
const Sale = require('./Sale');
const SaleItem = require('./SaleItem');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// User - Branch relationship
User.belongsTo(Branch, { foreignKey: 'branchId' });
Branch.hasMany(User, { foreignKey: 'branchId' });

// Product - Branch relationship
Product.belongsTo(Branch, { foreignKey: 'branchId' });
Branch.hasMany(Product, { foreignKey: 'branchId' });

// Customer - Branch relationship
Customer.belongsTo(Branch, { foreignKey: 'preferredBranchId', as: 'preferredBranch' });
Branch.hasMany(Customer, { foreignKey: 'preferredBranchId' });

// Sale relationships
Sale.belongsTo(Customer, { foreignKey: 'customerId' });
Customer.hasMany(Sale, { foreignKey: 'customerId' });

Sale.belongsTo(Branch, { foreignKey: 'branchId' });
Branch.hasMany(Sale, { foreignKey: 'branchId' });

Sale.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Sale, { foreignKey: 'userId' });

// SaleItem relationships
SaleItem.belongsTo(Sale, { foreignKey: 'saleId' });
Sale.hasMany(SaleItem, { foreignKey: 'saleId' });

SaleItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(SaleItem, { foreignKey: 'productId' });

module.exports = {
  User,
  Branch,
  Product,
  Customer,
  Sale,
  SaleItem,
  sequelize
}; 