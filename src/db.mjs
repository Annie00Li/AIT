
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
  password: {type: String, unique: true, required: true},

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
  chatted: {type: Boolean, default: false},

});

// TODO: add remainder of setup for slugs, connection, registering models, etc. below
ScholarSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=name%>'});
mongoose.model('User', UserSchema);
mongoose.model('Scholar', ScholarSchema);


// other user profile
/*const Scholar = mongoose.model('Scholar');
const s1 = new Scholar({
  name: 'Abe Ziegler',
  degree: 'Doctor of MachineLearning',
  major: 'Intelligent Control Systems',
  research_area: 'Computer Vision',
  research_topic: 'Person Search',
  published_paper: `Person Search with Natural Language Description, IEEE 2018 pages 1970–1977, October 2018; 
  Person Search Challenges and Solutions: A Survey, IJCAI 2021 Survey Track,  May 2021; 
  Probabilistic Methods for Finding People, International Journal of Computer Vision, 43, pages45–68 (2001), June 2001
  A Survey of Person Re-identification Based on Deep Learning, ICCPR 2021, pages 36–42, October 2021
  A Review on Computer Vision-Based Methods for Human Action Recognition, J. Imaging 2020, 10 June 2020
  TransMix: Attend to Mix for Vision Transformers, CVPR 2022
  Person Search Based on Improved Joint Learning Network, CSAE 2019, pages 1–7, October 2019
  Person Search via Deep Integrated Networks, Appl. Sci. 2020, 25 December 2019
  A cascaded multitask network with deformable spatial transform on person search, SAGE Journal, June 25, 2019`
 // user: req.session.user._id
});
s1.save((err, savedData) => {
  console.log('saved', savedData);
});

const s2 = new Scholar({
  name: 'Alexi Brosefino',
  degree: 'Doctor of Artificial Intelligence',
  major: 'Theoretical and Computational Science',
  research_area: 'Computer Vision',
  research_topic: 'Synthesis of Stereoscopic Movie from Conventional Monocular Video Clip',
  published_paper: `A Review on Computer Vision-Based Methods for Human Action Recognition, J. Imaging 2020, 10 June 2020`
 // user: req.session.user._id
});
s2.save((err, savedData) => {
  console.log('saved', savedData);
});
*/




const URI = process.env.MONGODB_URI || 'mongodb://localhost/ait-annie00li';
//mongoose.connect(URI, ()=>{console.log('connected to mongodb ',URI);});
const connectDatabase = async () => {
  try {
    
    await mongoose.connect(URI);

    console.log("connected to database", URI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDatabase();