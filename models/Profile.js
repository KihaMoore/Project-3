
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: String
  },
  status: {
    type: String,
  },
  favoriteplants: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  
  seed: [
    {
      number: {
        type: String,
        
      },
      seed: {
        type: String,
        
      },  
       description: {
         type: String
       }
    }
  ],
  wishlist: [
    {
      seed: {
        type: String,
        // required: true
      },
      number: {
        type: String,
        // required: true
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

