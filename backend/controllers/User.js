const db = require('../database/db');
const Helper = require('./Helper');

const User = {
  /**
   * Create A User
   */
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.emailIsValid(req.body.email)) {
      return res.status(400).send({ 'message': 'Invalid Email. Enter a valid one' });
    }
    const hashPassword = Helper.hashUserPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(id, firstname, lastname, email, password, gender, jobRole, 
        department, address)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hashPassword,
      req.body.gender,
      req.body.jobRole,
      req.body.department,
      req.body.address
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({ token });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'This EMAIL has already been taken' })
      }
      return res.status(400).send(error);
    }
  },

  /**
   * Login
   */

   async signin(req, res) {
     if(!req.body.email || !req.body.password) {
       return res.status(400).json({message: 'Email or Password field is blank'})
     }
     if(!Helper.emailIsValid(req.body.email)) {
       return res.status(400).json({message: 'Invalid email. Please enter a valid one'});
     }
     const queryText = 'SELECT * FROM users WHERE email=$1';
     try {
      const { rows } = await db.query(queryText, [req.body.email]);
      if(!rows[0]) {
        return res.status(400).json({message: 'Invalid Email/Password Combination'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({message: 'Incorrect password'});
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).json({token});
     } catch(err) {
        return res.status(400).json({err});
     }
   }
}

module.exports = User;