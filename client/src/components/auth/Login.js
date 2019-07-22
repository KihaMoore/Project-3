import React,{Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth'
  

   const Login = ({login, isAuthenticated}) => {
   /*FormData is State(object&field's velues.), setFormData will be a function that we want to use to update our state
   /*And we want to pull that from useState() hook */
    const [formData, setFormData] = useState({
      email: '',
      password: ''
      });

   const {email,password} = formData;


  const onChange = e => 
  /*Use ... to copy formData and then we want to change the value of [name] field
  /*we want to use name as a key, so we use []*/
  setFormData({...formData, [e.target.name]: e.target.value});

//Redirect if logged in
if(isAuthenticated) {
  return <Redirect to ="/dashboard" />
}

   const onSubmit = async e => {
     e.preventDefault();
     login(email,password);
   }; 

   return (
      /*whenever you need to wrap the content of a component and you don’t want to add an extra div or other wrapping element to the DOM, use a Fragment.*/
       <Fragment>
           <h1 className="large text-primary">Sign In</h1>
      <p className="lead">Sign Into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        
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
       
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign In</Link>
      </p>

       </Fragment>
       
     )
   };

      Login.propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
      }

      const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated
      });

   export default connect(
   mapStateToProps,
   {login}
   )(Login);
 