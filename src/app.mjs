import './db.mjs';
import * as auth from './auth.mjs';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';

import path from 'path';
import url from 'url';

//import * as auth from './auth.mjs';
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

const loginMessages = {"PASSWORDS DO NOT MATCH": 'Incorrect password', "USER NOT FOUND": 'User doesn\'t exist'};
const registrationMessages = {"USERNAME ALREADY EXISTS": "Username already exists", "USERNAME PASSWORD TOO SHORT": "Username or password is too short (> 8)"};

// require authenticated user for accessing profile
// require authenticated user for /sholar/add path
app.use(auth.authRequired(['/edit_profile']));
app.use(auth.authRequired(['/my_profile']));
// make {{user}} variable available for all paths
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/my_profile', (req, res) => {
  auth.authRequired();
  const User = mongoose.model('User');

   User.find({username: req.session.user.username},(err, user) => {
    res.render('my-profile', {user: user});
  });
});

app.get('/edit_profile', (req, res) => {
  auth.authRequired();
  res.render('edit-profile');
});

app.post('/edit_profile', (req, res) => {
  auth.authRequired();
  const User = mongoose.model('User');
  // Build user profile
    
    
    User.updateOne(
      {username: req.session.user.username},
    {$set: 
      {name: req.body.name, 
        degree: req.body.degree, 
        major: req.body.major, 
        research_area: req.body.research_area, 
        research_topic: req.body.research_topic, 
        published_paper: req.body.published_paper
      }} 
      ).then((obj) => { 
        res.redirect('/my_profile') 
        }) 
        
        .catch((err) => { 
        console.log('Error: ' + err);
        });
   

});

app.get('/search', (req, res) => {
  res.render('search');
});

let input;
app.post('/search', (req, res) => {
  input = req.body.keyword;

  res.redirect('/search_result');
  
});

app.get('/search_result', (req, res) => {
  const Scholar = mongoose.model('Scholar');
  
   Scholar.find({$or: [
    {name: `${input}`}, 
    {degree: `${input}`},
    {major:`${input}`},
    {research_area: `${input}`},
    {research_topic: `${input}`},
    {published_paper: `${input}`}
  ]},(err, scholars) => {
    res.render('search-result', {scholars: scholars});
  });
});

// user 
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  // setup callbacks for register success and error
  function success(newUser) {
    auth.startAuthenticatedSession(req, newUser, (err) => {
        if (!err) {
            res.redirect('/');
        } else {
            res.render('error', {message: 'err authing???'}); 
        }
    });
  }

  function error(err) {
    res.render('register', {message: registrationMessages[err.message] ?? 'Registration error'}); 
  }

  // attempt to register new user
  auth.register(req.body.username, req.body.email, req.body.password, error, success);
});
        

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
  // setup callbacks for login success and error
  function success(user) {
    auth.startAuthenticatedSession(req, user, (err) => {
      if(!err) {
        res.redirect('/'); 
      } else {
        res.render('error', {message: 'error starting auth sess: ' + err}); 
      }
    }); 
  }

  function error(err) {
    res.render('login', {message: loginMessages[err.message] || 'Login unsuccessful'}); 
  }

  // attempt to login
  auth.login(req.body.username, req.body.password, error, success);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});
