import React, { Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
 }
//we just want to run one time.
const App = () =>  {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return(
  <Provider store={store}>
  <Router>
 
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
      {/*we're going to just wrap everything in a switch say route same exact path and we're going to set*/}
       <Switch>
         <Route exact path="/register" component={Register} />
         <Route exact path="/login" component={Login} />
         <PrivateRoute 
         exact path="/dashboard" 
         component={Dashboard}
          />
         <PrivateRoute 
         exact path="/create-profile" 
         component={CreateProfile} 
         />
         <PrivateRoute 
         exact path="/edit-profile" 
         component={EditProfile} 
         />
         <PrivateRoute 
         exact path="/add-experience" 
         component={AddExperience} 
         />
          <PrivateRoute 
         exact path="/add-education" 
         component={AddEducation} 
         />
         
       </Switch> 
      </section>
    </Fragment>
    </Router>
    </Provider> 
)};


export default App;
