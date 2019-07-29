//
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/add-seed' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Add your seed
      </Link>
      <Link to='/add-wishlist' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary' /> Wish list
      </Link>
    </div>
  );
};

export default DashboardActions;
