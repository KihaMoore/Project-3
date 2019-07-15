//This file will have route that have anything to do with profiles,fetching them adding them updating them...etc

const express = require('express');
const request = require('request')
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/');

const profile = require('../../models/Profile');
const User = require('../../models/User');

//@route  GET api/profile/me
//@desc   Get current users profile
//@access Publicトークン要らない
router.get('/me', auth, async (req,res) => {
    try {
    const profile = await Profile.findOne({user: req.user.id}).populate(
    'user',
    ['name', 'avatar']
  );

    if(!profile) {
     return res.status(400).json({msg: 'There is no profile for this user'});
    }
    res.json(profile);
    }catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error line28..');
    }
});
//@route  POST api/profile
//@desc   Create or update users profile
//@access  Private

//we gonna use middleware/auth
router.post('/', 
[
  //we gonna use middleware/auth
  //2 required field which 'status' and 'skills'
  auth,
  [
  check('status', 'status is required')
   .not()
   .isEmpty(),
  check('skills', 'skills is required')
   .not()
   .isEmpty()
  ]
],
async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

const {
  company,
  website,
  location,
  bio,
  status,
  githubusername,
  skills,
  youtube,
  facebook,
  twitter,
  instagram,
  linkedin
} = req.body;
  
//Build profile object
const profileFields = {};
profileFields.user = req.user.id;
if(company)profileFields.company = company;
if(website)profileFields.website = website;
if(location)profileFields.location = location;
if(bio)profileFields.bio = bio; 
if(status)profileFields.status = status; 
if(githubusername)profileFields.githubusername = githubusername;
//we want to turn this array instead of comma separate list..
//So use .splite() and change the strings into array.
//and loop through the array and trim each skill.
if(skills){
  profileFields.skills = skills.split(',').map(skill => skill.trim());
 
}

//Build social object
profileFields.social = {};

if(youtube)profileFields.social.youtube = youtube; 
if(facebook)profileFields.social.facebook = facebook; 
if(twitter)profileFields.social.twitter = twitter; 
if(instagram)profileFields.social.instagram = instagram; 
if(linkedin)profileFields.social.linkedin = linkedin; 

try {
  let profile = await Profile.findOne({ user: req.user.id});

  if(profile) {
    //update
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id},
      { $set: profileFields},
      { new: true}
    );
   
    return res.json(profile);
    }
    //create
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
    }catch(err) {
      console.error(err.message);
  res.status(500).send('Server Error line 117...');
  }
 }
);

//@route  GET api/profile/
//@desc   Get all profile
//@access Publicトークン要らない

router.get('/', async (req, res) => {
   try {
     const profiles = await Profile.find().populate('user', ['name', 'avatar']);
     res.json(profiles);
   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server Error Kiha..');
     
   }
});

//@route  GET api/profile/user/:user_id
//@desc   Get profile by userID
//@access Publicトークン要らない

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user',
     ['name', 'avatar']);
   
   if(!profile)
   return res.status(400).json({msg:'Profile not foud'});
     
     res.json(profile);
  
    } catch (err) {
    console.error(err.message);
    if(err.kind != 'objectId'){
    return res.status(400).json({msg:'Profile not foud'});
    }
    res.status(500).send('Server Error line156');
    
  }
});

//@route  DELETE api/profile/
//@desc   delete profile, user & posts
//@access Private

router.delete('/', auth, async (req, res) => {
  try {
    //@todo -move users posts

    //Remove profile
    await Profile.findOneAndRemove({user: req.user.id});
    //Remove user
    await User.findOneAndRemove({_id: req.user.id});
    
    res.json({msg: 'User Deleted'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error177...');
    
  }
});



module.exports = router;

