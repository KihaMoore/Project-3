import React,{Fragment} from 'react'
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({ isAuthenticated}) => {
    if(isAuthenticated){
  return<Redirect to='/dashboard' />;
}

    const parallaxEls = document.querySelectorAll("[data-speed]");
      
      window.addEventListener("scroll", scrollHandler);
      
      function scrollHandler() {
        for (const parallaxEl of parallaxEls) {
          const direction = parallaxEl.dataset.direction == "up" ? "-" : "";
          const transformY = this.pageYOffset * parallaxEl.dataset.speed;
          

          if (parallaxEl.classList.contains("banner-title")) {
            parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-10deg)`;
          } else if (parallaxEl.classList.contains("banner-subtitle")) {
            parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-1deg)`;
          } else {
            parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0)`;
          }
        }
      }
      
      
return(
      <Fragment>
        <section class="banner" data-direction="down" data-speed="0.5">
         <img className="beet1 banner-title" src="img/garlic.png" alt="" data-direction="down" data-speed="1.3"/>
         <img className="lemon" src="img/lemon.png" alt="" data-direction="down" data-speed="1"/>
         <img class="risu1" src="img/risu.png" alt="" data-direction="up" data-speed="0.5"/>
         <img class="nut" src="img/nut.png" alt="" data-direction="up" data-speed="0.6"/>
         <img class="cabedge1" src="img/cabedge.png" alt="" data-direction="down" data-speed="1"/>
         <img class="ladybug" src="img/ladybug.png" alt="" data-direction="down" data-speed="0.5"/>
         <img class="chou" src="img/chou.png" alt="" data-direction="down" data-speed="0.01"/>
         <img class="bee-right" src="img/bee.png" alt="" data-direction="up" data-speed="0.1"/>
         <img class="nasu-right" src="img/nasu.png" alt="" data-direction="up" data-speed="2"/>
         <div class="container">
            <h1 class="main-title " data-direction="up" data-speed="0.6">Welcome to our seed exchange community!</h1>
            </div>
            
              <a href="#" class="scroll"><span></span></a> 
            
         <img class="kabu1" src="img/kabu.png" alt="" data-direction="down" data-speed="2"/>
     </section>
 
    <section class="banner" data-direction="up" data-speed="0.2">
      <img class="carrot" src="img/carrot.png" alt="" data-direction="up" data-speed="1"/>
      <img class="nasu" src="img/nasu.png" alt="" data-direction="up" data-speed="3"/>
      <img class="bumbble-bee" src="img/bumbble-bee.png" alt="" data-direction="up" data-speed="1.5"/>
  </section>
        <section className="landing">
         {/* <div className='dark-overlay'> */}
        <div className='landing-inner'>
          <h1 className='x-large letter-responsive'> Share and exchange your home grown seeds</h1>
          <div className='buttons'>
            <Link to="/register" className="btn btn-primary">Register</Link>
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
