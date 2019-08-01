//
import React from 'react';
import PropTypes from 'prop-types';


const ProfileSeed = ({
  seed: { seed, number,  description }
}) => (
  <div>
    <h3 className="text-dark">{seed}</h3>
    <p>
      <strong>Number of seed: </strong> {number}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileSeed.propTypes = {
  seed: PropTypes.object.isRequired
};

export default ProfileSeed;
