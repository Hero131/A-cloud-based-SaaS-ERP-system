const { Branch, User, Product } = require('../models');
const { AppError } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

exports.getAllBranches = async (req, res, next) => {
  try {
    const { search, isActive } = req.query;
    const where = {};

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { code: { [Op.iLike]: `%${search}%` } },
        { city: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const branches = await Branch.findAll({
      where,
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'role'],
        where: { isActive: true },
        required: false
      }]
    });

    res.status(200).json({
      status: 'success',
      results: branches.length,
      data: {
        branches
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'role'],
        where: { isActive: true },
        required: false
      }]
    });

    if (!branch) {
      return next(new AppError('No branch found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        branch
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.createBranch = async (req, res, next) => {
  try {
    const {
      name,
      code,
      address,
      city,
      state,
      country,
      pincode,
      phone,
      email,
      gstin,
      openingTime,
      closingTime
    } = req.body;

    const existingBranch = await Branch.findOne({ where: { code } });
    if (existingBranch) {
      return next(new AppError('Branch code already in use', 400));
    }

    const existingGSTIN = await Branch.findOne({ where: { gstin } });
    if (existingGSTIN) {
      return next(new AppError('GSTIN already in use', 400));
    }

    const branch = await Branch.create({
      name,
      code,
      address,
      city,
      state,
      country,
      pincode,
      phone,
      email,
      gstin,
      openingTime,
      closingTime,
      isActive: true
    });

    res.status(201).json({
      status: 'success',
      data: {
        branch
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBranch = async (req, res, next) => {
  try {
    const {
      name,
      code,
      address,
      city,
      state,
      country,
      pincode,
      phone,
      email,
      gstin,
      openingTime,
      closingTime,
      isActive
    } = req.body;

    const branch = await Branch.findByPk(req.params.id);

    if (!branch) {
      return next(new AppError('No branch found with that ID', 404));
    }

    if (code && code !== branch.code) {
      const existingBranch = await Branch.findOne({ where: { code } });
      if (existingBranch) {
        return next(new AppError('Branch code already in use', 400));
      }
    }

    if (gstin && gstin !== branch.gstin) {
      const existingGSTIN = await Branch.findOne({ where: { gstin } });
      if (existingGSTIN) {
        return next(new AppError('GSTIN already in use', 400));
      }
    }

    await branch.update({
      name: name || branch.name,
      code: code || branch.code,
      address: address || branch.address,
      city: city || branch.city,
      state: state || branch.state,
      country: country || branch.country,
      pincode: pincode || branch.pincode,
      phone: phone || branch.phone,
      email: email || branch.email,
      gstin: gstin || branch.gstin,
      openingTime: openingTime || branch.openingTime,
      closingTime: closingTime || branch.closingTime,
      isActive: isActive !== undefined ? isActive : branch.isActive
    });

    res.status(200).json({
      status: 'success',
      data: {
        branch
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByPk(req.params.id);

    if (!branch) {
      return next(new AppError('No branch found with that ID', 404));
    }

    const activeUsers = await User.count({
      where: {
        branchId: branch.id,
        isActive: true
      }
    });

    if (activeUsers > 0) {
      return next(new AppError('Cannot delete branch with active users', 400));
    }

    const products = await Product.count({
      where: {
        branchId: branch.id
      }
    });

    if (products > 0) {
      return next(new AppError('Cannot delete branch with existing products', 400));
    }

    await branch.update({ isActive: false });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

exports.getBranchStats = async (req, res, next) => {
  try {
    const branch = await Branch.findByPk(req.params.id);

    if (!branch) {
      return next(new AppError('No branch found with that ID', 404));
    }

    const userCount = await User.count({
      where: {
        branchId: branch.id,
        isActive: true
      }
    });

    const productCount = await Product.count({
      where: {
        branchId: branch.id
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          userCount,
          productCount
        }
      }
    });
  } catch (error) {
    next(error);
  }
}; 
