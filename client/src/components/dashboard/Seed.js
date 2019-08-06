
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSeed} from '../../actions/profile';

const Seed = ({ seed, deleteSeed }) => {
  const seeds = seed.map(seed => (
    <th key={seed._id}>
      <td>{seed.seed}</td>
      <td className="hide-sm">{seed.number}</td>
      <td className="hide-sm">{seed.description}</td>
      <td>
        <button
          onClick={() => deleteSeed(seed._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </th>
  ));

  return (
    <Fragment>
      <h2 className="my-2">My seed collections</h2>
      <table className="table">
        <thead>
          <th>
            <td>Name</td>
            <td className="hide-sm">Number of the seed</td>
            <td>Discroption</td>
            <td></td>
          </th>
        </thead>
        <tbody>{seeds}</tbody>
      </table>
    </Fragment>
  );
};

Seed.propTypes = {
  seed: PropTypes.array.isRequired,
  deleteSeed: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteSeed }
)(Seed);
