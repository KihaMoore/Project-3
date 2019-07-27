//This file will have route that have anything to do with profiles,fetching them adding them updating them...etc

const express = require('express');
const request = require('request')
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/');

const profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route  GET api/profile/me
//@desc   Get current users profile
//@access Publicトークン要らない
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    //we want to turn this array instead of comma separate list..
    //So use .splite() and change the strings into array.
    //and loop through the array and trim each skill.
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());

    }

    //Build social object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      //create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
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
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user',
      ['name', 'avatar']);

    if (!profile)
      return res.status(400).json({ msg: 'Profile not foud' });

    res.json(profile);

  } catch (err) {
    console.error(err.message);
    if (err.kind != 'objectId') {
      return res.status(400).json({ msg: 'Profile not foud' });
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
    await Post.deleteMany({user: req.user.id})
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error177...');

  }
});


// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //unshift() can add new items to the beginning of an array
      profile.experience.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  PUT request  api/profile/experience
//@desc   ADD profile experience
//@access Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //unshift() can add new items to the beginning of an array
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


//@route  DELETE  api/profile/experience/:exp_id
//@desc   Delete  experience from profile
//@access Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const expIds = foundProfile.experience.map(exp => exp._id.toString());
    //// if we dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /experience/5
    const removeIndex = expIds.indexOf(req.params.exp_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server Error" });
    } else {
      console.log("expIds", expIds);
      console.log("typeof expIds", typeof expIds);
      console.log("req.params", req.params);
      console.log("removed", expIds.indexOf(req.params.exp_id));
      foundProfile.experience.splice(removeIndex, 1);

      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

});


router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const eduIds = foundProfile.education.map(edu => edu._id.toString());
    // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /education/5
    const removeIndex = eduIds.indexOf(req.params.edu_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      // theses console logs helped me figure it out
      /*   console.log("eduIds", eduIds);
      console.log("typeof eduIds", typeof eduIds);
      console.log("req.params", req.params);
      console.log("removed", eduIds.indexOf(req.params.edu_id));
 */ foundProfile.education.splice(
      removeIndex,
      1,
    );
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

//@route  GET api/profile/github/:username
//@desc   Get user repos from Github
//@access Publicトークン要らない

router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `http://api.github.com/users/${req.params.username}/repos?
      per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}
      &client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error Kiha..")

  }
}
)



module.exports = router;

