import React, {Fragment} from 'react';

export default () => (
<Fragment>
<div id="my-spinner" class="box">
        <object id="my-svg" type="image/svg+xml" data="flowers.svg">
          <span>Loading...</span>
        </object>
      </div>
  </Fragment>
);