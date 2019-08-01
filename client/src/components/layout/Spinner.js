import React, {Fragment} from 'react';
import spinner from './spinner.jpg';

export default () => (
<Fragment>
  <img
  src={spinner}
  style={{width: '100px', margin: 'auto', display: 'block' }}
  alt='loading...'
/>
  </Fragment>
);


