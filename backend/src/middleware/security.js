const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

const securityMiddleware = [
  // Set security HTTP headers
  helmet(),
  
  // Sanitize data
  xss(),
  
  // Prevent HTTP Parameter Pollution
  hpp(),
  
  // Custom security headers
  (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  }
];

module.exports = securityMiddleware; 