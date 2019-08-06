
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileSeed from './ProfileSeed';
import ProfileWishList from './ProfileWishList';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn '>
            Back To Gardeners
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit my Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-light p-2'>
              <h5 className='text-primary-m'>Seed collection</h5>
              {profile.seed.length > 0 ? (
                <Fragment>
                  {profile.seed.map(seed => (
                    <ProfileSeed
                      key={seed._id}
                      seed={seed}
                    />
                  ))}
                </Fragment>
              ) : (
                <h2 className="noseedcollection">No seeds collection</h2>
              )}
            </div>

            <div className='profile-edu bg-light p-2'>
              <h5 className='text-primary-m'>Wish List</h5>
              {profile.wishlist.length > 0 ? (
                <Fragment>
                  {profile.wishlist.map(wishlist => (
                    <ProfileWishList
                      key={wishlist._id}
                      wishlist={wishlist}
                    />
                  ))}
                </Fragment>
              ) : (
                <h2 className="noseedcollection">No wish list</h2>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);

