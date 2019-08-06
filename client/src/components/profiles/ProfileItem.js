//
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    location,
    favoriteplants
  }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img p' />
      <div>
        <h2 className="large">{name}</h2>
        <p className='my-1 lead'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul classNmame="text-primary-m">
        {favoriteplants.slice(0, 4).map((favoriteplant, index) => (
          <li key={index} className='p lead'>
            <i className='fas fa-leaf' /> 
            {favoriteplant}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
