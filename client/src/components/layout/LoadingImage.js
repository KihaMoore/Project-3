import React,{Fragment} from "react";

const LoadingImage = () => 

<Fragment>
<div id="my-spinner" class="box">
       <object id="my-svg" type="image/svg+xml" data="./img/flowers.svg">
          <span>Loading...</span>
        </object>
</div>
</Fragment>

export default LoadingImage;