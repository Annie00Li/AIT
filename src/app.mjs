import './db.mjs';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';

import path from 'path';
import url from 'url';
//import * as auth from './auth.mjs';

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

const Scholar = mongoose.model('Scholar');


app.get('/', (req, res) => {
  Scholar.find({}).sort('-createdAt').exec((err, scholars) => {
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


app.listen(3000);
