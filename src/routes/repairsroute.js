const express = require('express');

//controllers
const repairsController = require('../controllers/repairs.controller');

//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const repairsMiddleware = require('../middlewares/repairs.middleware');

const router = express.Router();

router
  .route('/')
  .get(repairsController.findAllRepairs)
  .post(
    authMiddleware.protect,
    validationMiddleware.createRepairsValidation,
    repairsController.createRepairs
  );

router.use(authMiddleware.protect); //para saber que se loggio
/* 
router.get('/me', postController.findMyPosts);

router.get(
  '/profile/:id',
  userMiddleware.validUser,
  postController.findUserPosts
);
*/
router
  .use('/:id', repairsMiddleware.validRepairs) //para ver si existe y ponerlo en la req
  .route('/:id')
  .get(repairsController.findOneRepairs)
  .patch(
    validationMiddleware.createRepairsValidation,
    authMiddleware.protectAccountOwner,
    repairsController.updateRepairs
  )
  .delete(authMiddleware.protectAccountOwner, repairsController.deleteRepairs);

module.exports = router;
