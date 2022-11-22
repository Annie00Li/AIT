import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// assumes that User was registered in `./db.mjs`
const User = mongoose.model('User');

const startAuthenticatedSession = (req, user, cb) => {
  req.session.regenerate((err) => {
    if (!err) {
      req.session.user = user; 
    } 
    cb(err);
  });
};

const endAuthenticatedSession = (req, cb) => {
  req.session.destroy((err) => { cb(err); });
};


const register = (username, email, password, errorCallback, successCallback) => {

  bcrypt.hash(password, 10, function(err, hash) {
    // check if user exists
    User.findOne({username: username}, (err, result) => {
      if(result) {
        errorCallback({message: 'USERNAME ALREADY EXISTS'});
      }

      else if (username.length < 8 || password.length < 8) {
        errorCallback({message: 'USERNAME PASSWORD TOO SHORT'});
      }

      else {
        const u = new User({
          username: `${username}`,
          email: `${email}`,
          password: hash
        });
        u.save((err) => {
          if (!err) {
            successCallback(u);
          }
          else{
            errorCallback({message: 'DOCUMENT SAVE ERROR'});
          }
        });
      }
    });
    
  });

};


const login = (username, password, errorCallback, successCallback) => {

  User.findOne({username: username}, (err, user) => {
    if (!err && user) {
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (!err) {
          if (passwordMatch) {
            successCallback(user);
          }
          else {
            errorCallback({message: 'PASSWORDS DO NOT MATCH'});
          }
        }
        else {
          console.log(err);
        }
      });
    }

    else {
      errorCallback({message: 'USER NOT FOUND'});
    }
  });
};


// creates middleware that redirects to login if path is included in authRequiredPaths
const authRequired = authRequiredPaths => {
  return (req, res, next) => {
    if(authRequiredPaths.includes(req.path)) {
      if(!req.session.user) {
        res.redirect('/login'); 
      } else {
        next(); 
      }
    } else {
      next(); 
    }
  };
};

export {
  startAuthenticatedSession,
  endAuthenticatedSession,
  register,
  login,
  authRequired
};
