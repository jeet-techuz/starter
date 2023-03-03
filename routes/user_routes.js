const express = require('express');
const router = express.Router();
const usercontroller = require('./../controllers/usercontroller');
const Aunthcontroller = require('./../controllers/Aunthcontroller');

router.post('/signup', Aunthcontroller.signup);
router.post('/login', Aunthcontroller.login);

router
  .route('/')
  .get(usercontroller.getallUser)
  .post(usercontroller.createnewuser);
router
  .route('/:id')
  .get(usercontroller.getuserById)
  .patch(usercontroller.updateuserById)
  .delete(usercontroller.deleteuserById);

module.exports = router;
