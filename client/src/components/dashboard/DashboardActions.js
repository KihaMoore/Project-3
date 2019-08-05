
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-pink'>
        <i className='fas fa-pen white' /> Edit Profile
      </Link>
      <Link to='/add-seed' className='btn btn-pink'>
        <i className='fab fa-circle white' /> Add your seed
      </Link>
      <Link to='/add-wishlist' className='btn btn-pink'>
        <i className='fas fa-heart white' /> Wish list
      </Link>
    </div>
  );
};

export default DashboardActions;
