  import React,{Fragment, useState} from 'react'

   const Register = () => {
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
  /*Use ... to copy formData and then we want to change the value of [name] field
  /*we want to use name as a key, so we use []*/
  setFormData({...formData, [e.target.name]: e.target.value});

   const onSubmit = e => {
     e.preventDefault();
     if(password !== password2) {
       console.log('Password do not match');
     }else{

     }
   }

   return (
      /*whenever you need to wrap the content of a component and you don’t want to add an extra div or other wrapping element to the DOM, use a Fragment.*/
       <Fragment>
           <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
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
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
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
        Already have an account? <a href="login.html">Sign In</a>
      </p>

       </Fragment>
       
     )
   };

   export default Register