const express = require('express');

//controllers
const authController = require('./../controllers/auth.controller');

//middlewares
const validationMiddleware = require('./../middlewares/validations.middleware');
//const userMiddleware = require('./../middlewares/user.middleware');
//const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.post(
  '/logup',
  validationMiddleware.createUserValidation,
  authController.logUp
);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  authController.logIn
);
/* 
router.use(authMiddleware.protect);

router.patch(
  '/password/:id',
  validationMiddleware.updatePasswordValidation,
  userMiddleware.validUser,
  authMiddleware.protectAccountOwner,
  authController.updatePassword
);
*/
module.exports = router;
