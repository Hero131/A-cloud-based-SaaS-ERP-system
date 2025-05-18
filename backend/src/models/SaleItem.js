const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class SaleItem extends Model {}

SaleItem.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  saleId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  weight: {
    type: DataTypes.DECIMAL(10, 3),
    allowNull: false
  },
  unitPrice: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  makingCharges: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  taxRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  taxAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'SaleItem',
  indexes: [
    {
      fields: ['saleId']
    },
    {
      fields: ['productId']
    }
  ]
});

module.exports = SaleItem; 