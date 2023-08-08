const catchAsync = require('../utils/catchAsync');

const { db } = require('../database/config');

const { Repairs, repairsStatus } = require('../models/repairs.model');
const User = require('../models/user.model');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repairs.findAll({
    where: {
      status: repairsStatus.pending,
    },
    attributes: {
      exclude: ['status', 'userId'], //para anular lo que no queremos enviar al front end
    },
    include: [
      {
        model: User, //se pone el nombre del modelo primero
        attributes: ['id', 'name'],
      },
    ],
    order: [['createdAt', 'DESC']], //para que muestre la informacion de madera descendente, por orden de creacion
    limit: 10, //limita a los ultimos 10
  });

  return res.status(200).json({
    status: 'success',
    results: repairs.length,
    repairs,
  });
});

exports.createRepairs = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description } = req.body;
  const user = req.sessionUser;
  const userId = user.id;

  const repairs = await Repairs.create({
    date,
    motorsNumber,
    description,
    userId,
  });

  return res.status(201).json({
    status: 'success',
    message: 'the repairs has been created!',
    repairs,
  });
});

exports.findOneRepairs = catchAsync(async (req, res, next) => {
  const { repairs } = req;

  return res.status(200).json({
    status: 'sucess',
    repairs,
  });
});

exports.updateRepairs = catchAsync(async (req, res, next) => {
  const { repairs } = req;

  const status = repairsStatus.completed;

  await repairs.update({ status });

  return res.status(200).json({
    status: 'success',
    message: 'the repairs has been updated',
  });
});

exports.deleteRepairs = catchAsync(async (req, res, next) => {
  const { repairs } = req;

  await repairs.update({ status: repairsStatus.cancelled });

  return res.status(200).json({
    status: 'success',
    message: 'the repairs has been deleted!',
  });
});
