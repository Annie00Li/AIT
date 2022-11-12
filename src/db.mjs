
import mongoose, { Schema } from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more lists

  // username provided by authentication plugin
  // password hash provided by authentication plugin

const UserSchema = new mongoose.Schema({
  username: {type:String, required: true},
  email: {type:String, required: true},
  password: {type: String, unique: true, required: true}
});

// a user registered through the web app
// contains its basic info and engagement with the primary user
const ScholarSchema = new mongoose.Schema({
  name: {type: String, required: true},
  degree: {type: String, required: true},
  major: {type: String},
  research_area: {type: String},
  research_topic: {type: String},
  published_paper: {type:String},
  chatted: {type: Boolean, default: false}
});

// TODO: add remainder of setup for slugs, connection, registering models, etc. below
ScholarSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=name%>'});
mongoose.model('User', UserSchema);
mongoose.model('Scholar', ScholarSchema);

const URI = process.env.MONGODB_URI || 'mongodb://localhost/ait-annie00li';
await mongoose.connect(URI, ()=>{console.log('connected to mongodb ',URI);});