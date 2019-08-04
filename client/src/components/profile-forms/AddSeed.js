
import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSeed } from '../../actions/profile';

const AddSeed = ({ addSeed, history }) => {
  const [formData, setFormData] = useState({
    seed: '',
    number: '',
    location: '',
    from: '',
    description: ''
  });

  // const [toDateDisabled, toggleDisabled] = useState(false);

  const { seed, number,  from, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your seed coolections</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> 
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addSeed(formData, history);
        }}
      >
       
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Name of the seed'
            name='seed'
            value={seed}
            onChange={e => onChange(e)}
           
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* number of the seed'
            name='number'
            value={number}
            onChange={e => onChange(e)}
            required
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

AddSeed.propTypes = {
  addSeed: PropTypes.func.isRequired
};

export default connect(
  null,
  { addSeed }
)(withRouter(AddSeed));

