const express = require('express');
const router = express.Router();
const tourcontroller = require('../controllers/tourcontroller');
const Aunthcontroller = require('./../controllers/Aunthcontroller');

router
  .route('/')
  .get(Aunthcontroller.protect, tourcontroller.getalltours)
  .post(tourcontroller.creatTour);
router.route('/tour-stats').get(tourcontroller.getToursStats);
router
  .route('/:id')
  .get(tourcontroller.gettoursById)
  .patch(tourcontroller.editTourById)
  .delete(
    Aunthcontroller.protect,
    Aunthcontroller.restrictTo('admin'),
    tourcontroller.deleteTourById
  );

module.exports = router;
