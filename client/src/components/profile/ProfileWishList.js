
import React from 'react';
import PropTypes from 'prop-types';

const ProfileWishList = ({
  wishlist: { seed, number, description }
}) => (
  <div>
    <h2 className="text-dark noseedcollection">{seed}</h2>
    <p>
      <strong className="noseedcollection">Number of the seed: </strong> {number}
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
