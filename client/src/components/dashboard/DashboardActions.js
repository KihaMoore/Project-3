//
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-pen text-primary ' /> Edit Profile
      </Link>
      <Link to='/add-seed' className='btn btn-light'>
        <i className='fab fa-circle text-primary ' /> Add your seed
      </Link>
      <Link to='/add-wishlist' className='btn btn-light'>
        <i className='fas fa-heart text-primary' /> Wish list
      </Link>
    </div>
  );
};

export default DashboardActions;
