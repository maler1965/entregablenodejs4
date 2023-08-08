const catchAsync = require('../utils/catchAsync');
const { Repairs, repairsStatus } = require('../models/repairs.model');
const AppError = require('../utils/appError');

exports.validRepairs = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repairs = await Repairs.findOne({
    where: {
      status: repairsStatus.active,
      id,
    },
  });

  if (!repairs) {
    return next(new AppError(`Repairs with id: ${id} not found`, 404));
  }

  req.repairs = repairs;
  next();
});
