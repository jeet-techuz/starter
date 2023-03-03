const AppError = require('../utils/appError');
const Tour = require('./../model/tourmodel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getalltours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  res.status(200).json({
    status: 'sucess',
    result: tours.length,
    data: {
      tours,
    },
  });
});
exports.gettoursById = catchAsync(async (req, res, next) => {
  const GetTour = await Tour.findById(req.params.id);
  if (!GetTour) {
    return next(new AppError(`No Tour Found with That Id`, 404));
  }
  res.status(200).json({
    status: 'Sucess',
    data: {
      GetTour,
    },
  });
});
exports.creatTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'sucess',
    data: {
      tours: newTour,
    },
  });
});
exports.editTourById = catchAsync(async (req, res, next) => {
  const UpdateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!UpdateTour) {
    return next(new AppError(`No Tour Found with That Id`, 404));
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      UpdateTour,
    },
  });
});
exports.deleteTourById = catchAsync(async (req, res, next) => {
  const Deletetour = await Tour.findByIdAndDelete(req.params.id);
  if (!Deletetour) {
    return next(new AppError(`No Tour Found with That Id`, 404));
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      Deletetour,
    },
  });
});
exports.getToursStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTOurs: { $sum: 1 },
        numOfRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        maxPrice: { $max: '$price' },
        minPrice: { $avg: '$price' },
      },
    },
    {
      $sort: { avgPrice: -1 },
    },
  ]);
  res.status(200).json({
    status: 'Sucess',
    data: stats,
  });
});
