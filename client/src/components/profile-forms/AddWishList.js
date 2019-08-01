//
import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWishList } from '../../actions/profile';

const AddWishList = ({ addWishList, history }) => {
  const [formData, setFormData] = useState({
    seed: '',
    number: '',
    description: ''
  });

  const {
    seed,
    number,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Wish lish</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> 
      </p>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addWishList(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='name of seed'
            name='seed'
            value={seed}
            onChange={e => onChange(e)}
            
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Number of seed'
            name='number'
            value={number}
            onChange={e => onChange(e)}
            
          />
        </div>
      
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Seed Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddWishList.propTypes = {
  addWishList: PropTypes.func.isRequired
};

export default connect(
  null,
  { addWishList }
)(withRouter(AddWishList));
