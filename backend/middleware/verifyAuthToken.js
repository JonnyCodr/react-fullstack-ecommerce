const jwt = require('jsonwebtoken');

const verifyIsLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.access_token
    if(!token) {
      return res.status(403).send("A token is required for authentication")
    }

    try {
      const decoded = jwt.verify(token, 'supersecret')
      req.user = decoded
      next()
    } catch (err) {
      return res.status(401).send("Unauthorized. Invalid Token")
    }

  } catch(err) {
    next(err)
  }
}

const verifyIsAdmin = (req, res, next) => {
  console.log('user', req.user)
  console.log('user is admin', req.user.isAdmin)
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
