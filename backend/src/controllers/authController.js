const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Branch } = require('../models');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, branchId, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new AppError('Email already in use', 400));
    }

    // Check if branch exists
    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      return next(new AppError('Branch not found', 404));
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      branchId,
      role: role || 'sales_executive'
    });

    createSendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Get user based on email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(new AppError('There is no user with that email address', 404));
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // TODO: Send email with reset token
    logger.info(`Password reset token for ${email}: ${resetToken}`);

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    // Get user based on token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    // Update password
    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user from collection
    const user = await User.findByPk(req.user.id);

    // Check if current password is correct
    if (!(await user.comparePassword(currentPassword))) {
      return next(new AppError('Your current password is incorrect', 401));
    }

    // Update password
    user.password = newPassword;
    await user.save();

    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
}; 