const express = require('express');
const app = express();
const AppError = require('./utils/appError');
const errorcontroller = require('./controllers/Errorcontroller');
const tourrouter = require('./routes/tour_routes');
const userrouter = require('./routes/user_routes');

// 1) Middle Ware
//app.use(morgan('dev'))
app.use(express.json());
// app.use((req, res, next) => {
//   console.log(req.headers);
// });
// 4) Routes

app.use('/api/v1/tours', tourrouter);
app.use('/api/v1/users', userrouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorcontroller);

module.exports = app;
