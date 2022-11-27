const jwt = require('jsonwebtoken');

const generateAuthToken = ( _id, name, lastName, email, isAdmin ) => {
  // const secret = process.env.JWT_SECRET || 'supersecret';

  return jwt.sign({_id, name, lastName, email, isAdmin}, 'supersecret', {
    expiresIn: "30d"
  })
};


module.exports = { generateAuthToken };
