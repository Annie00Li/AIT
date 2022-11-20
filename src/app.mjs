import './db.mjs';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import './main.js';

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



app.get('/', (req, res) => {
  const Scholar = mongoose.model('Scholar');

   Scholar.find({},(err, scholars) => {
    console.log(scholars);
    res.render('index', {home: true, scholars: scholars});
  });
});

app.get('/scholar/add', (req, res) => {
  res.render('scholar-add');
});

app.post('/scholar/add', (req, res) => {
  
  const Scholar = mongoose.model('Scholar');
  // Build user profile
  const a = new Scholar({
    name: req.body.name,
    degree: req.body.degree,
    major: req.body.major,
    research_area: req.body.research_area,
    research_topic: req.body.research_topic,
    published_paper: req.body.published_paper
   // user: req.session.user._id
  });
  a.save((err) => {
    if (!err) {
      res.redirect('/');
    }
    else {
      res.render('scholar-add', {err: 'saved unsuccesful'});
    }
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
  res.render('search-result');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});
