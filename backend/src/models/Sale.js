const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Sale extends Model {}

Sale.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  branchId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  saleDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  subtotal: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  taxAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'card', 'upi', 'bank_transfer'),
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  transactionId: {
    type: DataTypes.STRING
  },
  notes: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('draft', 'confirmed', 'cancelled'),
    defaultValue: 'draft'
  },
  loyaltyPointsEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  loyaltyPointsRedeemed: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  gstin: {
    type: DataTypes.STRING
  },
  invoiceUrl: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Sale',
  indexes: [
    {
      unique: true,
      fields: ['invoiceNumber']
    }
  ]
});

module.exports = Sale; 