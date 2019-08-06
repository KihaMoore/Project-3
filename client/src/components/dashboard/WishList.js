
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteWishList } from '../../actions/profile';

const WishList = ({ wishlist, deleteWishList }) => {
  const wishlists = wishlist.map(wish => (
    <tr key={wish._id}>
      <td>{wish.seed}</td>
      <td className="hide-sm">{wish.number}</td>
      <td className="hide-sm">{wish.description}</td>
      
      <td>
        <button
          onClick={() => deleteWishList(wish._id)}
          className="btn btn-danger"
         >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Your seed wish list</h2>
      <table className="table">
        <thead>
          <tr>
            <td className="hide-sm my-2">Name of the seed</td>
            <td className="hide-sm my-2">Number of the seed</td>
            <td className="hide-sm my-2">Description</td>
            <td></td>
          </tr>
        </thead>
        <tbody>{wishlists}</tbody>
      </table>
    </Fragment>
  );
};

WishList.propTypes = {
  wishlist: PropTypes.array.isRequired,
  deleteWishList: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteWishList }
)(WishList);
