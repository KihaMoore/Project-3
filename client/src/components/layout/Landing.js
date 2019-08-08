import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
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


  return (
    <Fragment>
      <section className="banner" data-direction="down" data-speed="0.5">
        <img className="beet1 banner-title" src="img/garlic.png" alt="" data-direction="down" data-speed="1.3" />
        <img className="lemon" src="img/lemon.png" alt="" data-direction="down" data-speed="0.8" />
        <img className="risu1" src="img/risu.png" alt="" data-direction="up" data-speed="0.5" />
        <img className="nut" src="img/nut.png" alt="" data-direction="up" data-speed="0.6" />
        <img className="cabedge1" src="img/cabedge.png" alt="" data-direction="down" data-speed="1" />
        <img className="ladybug" src="img/ladybug.png" alt="" data-direction="down" data-speed="0.5" />
        <img className="chou" src="img/chou.png" alt="" data-direction="down" data-speed="0.01" />
        <img className="bee-right" src="img/bee.png" alt="" data-direction="up" data-speed="0.1" />
        <img className="nasu-right" src="img/nasu.png" alt="" data-direction="up" data-speed="1" />
        <div className="container">
          <h1 className="main-title " data-direction="up" data-speed="0.6">Welcome to our seed exchange community!</h1>
        </div>

        <a href="#" className="scroll"><span></span></a>

        <img className="kabu1" src="img/kabu.png" alt="" data-direction="down" data-speed="2" />
      </section>

      <section className="banner" data-direction="up" data-speed="0.2">
     
        <img className="carrot" src="img/carrot.png" alt="" data-direction="up" data-speed="1" />
        <img className="nasu" src="img/nasu.png" alt="" data-direction="up" data-speed="3" />
        <img className="bumbble-bee" src="img/bumbble-bee.png" alt="" data-direction="up" data-speed="1.5" />
      </section>
     

      <section className="landing">
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
