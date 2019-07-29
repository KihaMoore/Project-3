//
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileWishList = ({
  wishlist: { seed, number, description }
}) => (
  <div>
    <h3 className="text-dark">{seed}</h3>
    <p>
      <strong>Number of the seed: </strong> {number}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileWishList.propTypes = {
  wishlist: PropTypes.object.isRequired
};

export default ProfileWishList;
