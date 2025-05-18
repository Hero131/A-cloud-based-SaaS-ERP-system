const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.ENUM('gold', 'silver', 'diamond', 'platinum', 'other'),
    allowNull: false
  },
  subCategory: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weight: {
    type: DataTypes.DECIMAL(10, 3), // Weight in grams
    allowNull: false
  },
  purity: {
    type: DataTypes.DECIMAL(5, 2), // Purity percentage
    allowNull: false
  },
  makingCharges: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  basePrice: {
    type: DataTypes.DECIMAL(12, 2), // Base price per gram
    allowNull: false
  },
  sellingPrice: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  branchId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  specifications: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastStockUpdate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Product',
  indexes: [
    {
      unique: true,
      fields: ['sku', 'branchId']
    }
  ]
});

module.exports = Product; 