const logRequest = (req, res, next) => {
  console.log('log req', req.method, req.path);
  next();
};

module.exports = logRequest;
