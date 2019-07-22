  import React,{Fragment, useState} from 'react';
  import { connect } from 'react-redux';
  import {Link, Redirect} from 'react-router-dom';
  import {setAlert} from '../../actions/alert';
  import { register} from '../../actions/auth';
  import PropTypes from 'prop-types';
  
  
  

   const Register = ({setAlert, register, isAuthenticated}) => {
   /*FormData is State(object&field's velues.), setFormData will be a function that we want to use to update our state
   /*And we want to pull that from useState() hook */
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   });

   const {name,email,password,password2} = formData;

   


  const onChange = e => 
  /*Use ... to copy formData and then we want to change the value of name field
  /*we want to use name as a key, so we use [e.target.name]*/
  setFormData({...formData, [e.target.name]: e.target.value});

   const onSubmit = async e => {
     e.preventDefault();
     if(password !== password2) {
       setAlert('Password do not match', 'danger');
     }else{
       register({name,email,password});
     } 
   }; 

   
   if(isAuthenticated){
     return <Redirect to='/dashboard' />;
   }

   return (
      /*whenever you need to wrap the content of a component and you don’t want to add an extra div or other wrapping element to the DOM, use a Fragment.*/
       <Fragment>
           <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Name" 
          name="name" 
          value={name}
          onChange={e => onChange(e)}
          required 
          />
        </div>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address" 
          name="email" 
          value={email}
          onChange={e => onChange(e)}
          />
       </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
             onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>

       </Fragment>
       
     );
   };

   Register.propTypes= {
     setAlert:PropTypes.func.isRequired,
     register: PropTypes.func.isRequired,
     isAuthenticated: PropTypes.bool
   };

   const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

   export default connect(
     mapStateToProps,
      {setAlert, register}
      )(Register);