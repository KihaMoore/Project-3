import React,{Fragment} from 'react'
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({ isAuthenticated}) => {
    if(isAuthenticated){
  return<Redirect to='/dashboard' />;
}

return(
      <Fragment>
        <section class="banner" data-direction="down" data-speed="0.5">
        <img className="beet1 banner-title" src="img/beet.png" alt="" data-direction="up" data-speed="0.3"/>
         <img class="risu1" src="img/risu.png" alt="" data-direction="up" data-speed="0.5"/>
         <img class="cabedge1" src="img/cabedge.png" alt="" data-direction="down" data-speed="0.1"/>
         <img class="bee-right" src="img/bee.png" alt="" data-direction="up" data-speed="4"/>
         <img class="bee-right" src="img/nasu.png" alt="" data-direction="up" data-speed="5"/>
         <div class="container">
            <h1 class="main-title" data-direction="up" data-speed="0.9">Welcome to our seed exchange community!</h1>
            </div>
            
                <a href="#" class="scroll"><span></span></a>
            
         <img class="kabu1" src="img/kabu.png" alt="" data-direction="down" data-speed="1.5"/>
         <img class="chou banner-title" src="img/chou.png" alt="" data-direction="down" data-speed="2"/>
     </section>
 
    <section class="banner" data-direction="up" data-speed="0.2">
     <h1 class="banner-title" data-direction="up" data-speed="0.1">Why seed exchange?</h1>
     <h2>Let's exchange our seed</h2>
              <div class="video-container">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/CzUqYHkXwuo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>

      <img class="rabbit" src="img/rabbit.png" alt="" data-direction="up" data-speed="7"/>
      <img class="carrot" src="img/carrot.png" alt="" data-direction="up" data-speed="6"/>
      <img class="nasu" src="img/nasu.png" alt="" data-direction="up" data-speed="3"/>
      <img class="bee1" src="img/bee.png" alt="" data-direction="up" data-speed="1.5"/>
  </section>
        <section className="landing">
         {/* <div className='dark-overlay'> */}
        <div className='landing-inner'>
          <img className="dragonfly" src="../img/Dragon-fly.jpg" alt=""/>
          <h1 className='x-large'> Share and exchange your home grown seeds</h1>
          <div className='buttons'>
            <Link to="/register" className="btn btn-primary">Signin</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </section>
      </Fragment>
    );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
