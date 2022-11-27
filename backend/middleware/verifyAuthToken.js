const jwt = require('jsonwebtoken');

const verifyIsLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).send("Unauthorized: No token provided");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'uspersecret');
      req.user = decoded;
      next();

    } catch (error) {
      return res.status(403).send("Unauthorized: Invalid token");
    }
    next();
  } catch (error) {
    next(error);
  }
}

const verifyIsAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(401).send("Unauthorized: You are not an admin");
    }
  } catch (error) {
    next(error);
  }
}


module.exports = { verifyIsLoggedIn, verifyIsAdmin };
