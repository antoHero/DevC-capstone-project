const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Helper = {
  /**
   * Hash user password
   */
  hashUserPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },
  /**
   * Check if passwords match
   */
  comparePassword(hashUserPassword, password) {
    return bcrypt.compareSync(password, hashUserPassword);
  },
  /**
   * Checks if email address is valid
   */
  emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   */
  generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  }
}

module.exports = Helper;