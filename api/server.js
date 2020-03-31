const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/usersRouter.js');
const restricted = require('../auth/restrictedMiddleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('common'));
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, checkRole('user'), usersRouter);

server.get('/', (req, res) => {
  res.send('Server is up!  Let\'s do some testing!')
})

module.exports = server;

function checkRole(role) {
  return (req, res, next) => {
    if(
      req.decodedToken &&
      req.decodedToken.role &&
      req.decodedToken.role.toLowerCase() === role
    ) {
      next();
    } else {
      res.status(403).json({ message: 'Sorry, but no.' })
    }
  }
}

// review JWT video again for info on roles/routes/auth, restricting auth based on role on login
