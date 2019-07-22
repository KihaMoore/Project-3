import React, { Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
//Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
 }
//we just want to run on time.
const App = () =>  {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return(
  <Provider store={store}>
  <Router>
    {/* Fragment is like a gohst elemnt that won't show up DOM */}
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
      {/*we're going to just wrap everything in a switch say route same exact path and we're going to set*/}
       <Switch>
         <Route exact path="/register" component={Register} />
         <Route exact path="/login" component={Login} />
       </Switch> 
      </section>
    </Fragment>
    </Router>
    </Provider> 
)};


export default App;
