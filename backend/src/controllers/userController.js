const { User, Branch } = require('../models');
const { AppError } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

exports.getAllUsers = async (req, res, next) => {
  try {
    const { branchId, role, search } = req.query;
    const where = {};

    if (branchId) {
      where.branchId = branchId;
    }

    if (role) {
      where.role = role;
    }

    if (search) {
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const users = await User.findAll({
      where,
      include: [{
        model: Branch,
        attributes: ['name', 'code']
      }],
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Branch,
        attributes: ['name', 'code']
      }],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, branchId, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new AppError('Email already in use', 400));
    }

    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      return next(new AppError('Branch not found', 404));
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      branchId,
      role: role || 'sales_executive'
    });

    user.password = undefined;

    res.status(201).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, branchId, role, isActive } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return next(new AppError('Email already in use', 400));
      }
    }

    if (branchId && branchId !== user.branchId) {
      const branch = await Branch.findByPk(branchId);
      if (!branch) {
        return next(new AppError('Branch not found', 404));
      }
    }

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      branchId: branchId || user.branchId,
      role: role || user.role,
      isActive: isActive !== undefined ? isActive : user.isActive
    });

    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    await user.update({ isActive: false });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{
        model: Branch,
        attributes: ['name', 'code']
      }],
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCurrentUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.findByPk(req.user.id);

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return next(new AppError('Email already in use', 400));
      }
    }

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email
    });

    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
}; 
