
import React from 'react';
import PropTypes from 'prop-types';


const ProfileSeed = ({
  seed: { seed, number,  description }
}) => (
  <div>
    <h2 className="text-dark noseedcollection">{seed}</h2>
    <p className="noseedcollection">
      <strong className="noseedcollection" >Number of seed: </strong> {number}
    </p>
    <p className="noseedcollection">
      <strong className="noseedcollection">Description: </strong> {description}
    </p>
  </div>
);

ProfileSeed.propTypes = {
  seed: PropTypes.object.isRequired
};

export default ProfileSeed;
