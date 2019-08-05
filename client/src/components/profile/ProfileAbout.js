
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    favoriteplants,
    user: { name }
  }
}) => (
  <div className='profile-about bg-light p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
    <h4 className='text-primary'>Favorite plant</h4>
    <div className='favoriteplants'>
      {favoriteplants.map((favoriteplant, index) => (
        <div key={index} className='p-1 noseedcollection'>
          <i className='fas fa-check' /> {favoriteplant}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
