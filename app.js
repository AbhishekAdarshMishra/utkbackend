const express = require('express');
const app = express();
const morgan =require('morgan');
const bodyParser = require('body-parser');


const restroom_create_Routes = require('./api/routes/restroom_create');
const restroom_login_Routes = require('./api/routes/restroom_login');
const restroom_get_Routes = require('./api/routes/restroom_get');
const restroom_modify_Routes = require('./api/routes/restroom_modify');
const restroom_delete_Routes = require('./api/routes/restroom_delete');


const review_Routes=require('./api/routes/review');
const review_get_Routes=require('./api/routes/review_get');

const inspector_create_Routes = require('./api/routes/inspector_create');
const inspector_login_Routes = require('./api/routes/inspector_login');
const inspector_modify_Routes = require('./api/routes/inspector_modify');
const inspector_delete_Routes = require('./api/routes/inspector_delete');


const worker_create_Routes = require('./api/routes/worker_create');
const worker_login_Routes = require('./api/routes/worker_login');
const worker_modify_Routes = require('./api/routes/worker_modify');
const worker_delete_Routes = require('./api/routes/worker_delete');

const inspector_rev_Routes =require('./api/routes/inspector_rev');
const worker_daily_update_Routes =require('./api/routes/worker_daily_update');

const admin_create_Routes = require('./api/routes/admin_create');
const admin_login_Routes = require('./api/routes/admin_login');




const mongoose = require('mongoose');

const mongl='mongodb://localhost/rstroom';
const mong='mongodb+srv://abhishek:111abhishek111@uttrakhandtourism-vujwc.mongodb.net/test?retryWrites=true&w=majority';




mongoose
  .connect(mongl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-with,Content-Type,Accept,Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


 app.use('/restroom_create',restroom_create_Routes);
 app.use('/restroom_login',restroom_login_Routes);
 app.use('/restroom_get',restroom_get_Routes);
 app.use('/restroom_modify',restroom_modify_Routes);
 app.use('/restroom_delete',restroom_delete_Routes);


 app.use('/review',review_Routes);
 app.use('/review_get',review_get_Routes);

 app.use('/inspector_create',inspector_create_Routes);
 app.use('/inspector_login',inspector_login_Routes);
 app.use('/inspector_modify',inspector_modify_Routes);
 app.use('/inspector_delete',inspector_delete_Routes);


  app.use('/worker_create',worker_create_Routes);
  app.use('/worker_login',worker_login_Routes);
  app.use('/worker_modify',worker_modify_Routes);
  app.use('/worker_delete',worker_delete_Routes);

 app.use('/inspector_rev',inspector_rev_Routes);
 app.use('/worker_daily_update',worker_daily_update_Routes);

 app.use('/admin_create',admin_create_Routes);
 app.use('/admin_login',admin_login_Routes);
 





 app.use((req,res,next) =>{
     const error = new Error('Not Found');
     error.status=404;
     next(error);
 });
 
 app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error: {
            message: error.message
        }
    });
 });

 module.exports = app;