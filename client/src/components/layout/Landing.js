import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <section className="landing">
         <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Seed of life</h1>
          <p className='lead'>
            Share and exchange our home grown seeds
          </p>
          <div className='buttons'>
            <Link to="/register" className="btn btn-primary">Signin</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
     </section>
    )
}





export default Landing
