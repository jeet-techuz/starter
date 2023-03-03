const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../../model/tourmodel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('connection sucessfully'));
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
const importdata = async () => {
  try {
    await Tour.create(tours);
    console.log('data sucessfully Inserted ');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deletedata = async () => {
  try {
    await Tour.deleteMany();
    console.log('data sucessfully deleted ');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importdata();
} else if (process.argv[2] === '--delete') {
  deletedata();
} else
  (err) => {
    console.log(err);
  };
