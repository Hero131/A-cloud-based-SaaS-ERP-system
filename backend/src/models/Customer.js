const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Customer extends Model {}

Customer.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.TEXT
  },
  city: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  pincode: {
    type: DataTypes.STRING
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY
  },
  anniversary: {
    type: DataTypes.DATEONLY
  },
  loyaltyPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalPurchaseAmount: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  lastPurchaseDate: {
    type: DataTypes.DATE
  },
  preferredBranchId: {
    type: DataTypes.UUID
  },
  customerType: {
    type: DataTypes.ENUM('regular', 'premium', 'vip'),
    defaultValue: 'regular'
  },
  notes: {
    type: DataTypes.TEXT
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Customer',
  indexes: [
    {
      unique: true,
      fields: ['phone']
    },
    {
      unique: true,
      fields: ['email']
    }
  ]
});

module.exports = Customer; 