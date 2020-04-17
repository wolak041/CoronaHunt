import * as React from 'react';
import PropTypes from 'prop-types';

function HeartIcon(props) {
   const { width, height, fill } = props;

   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink"
         version="1.1"
         height={height}
         width={width}
         viewBox="0 0 345 342"
      >
         <defs>
            <g id="heart">
               <path
                  d="M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0z"
               />
            </g>
         </defs>
         <use
            xlinkHref="#heart"
            fill={fill}
            transform="rotate(225,150,121)"
         />
      </svg>
   );
}

HeartIcon.propTypes = {
   width: PropTypes.number,
   height: PropTypes.number,
   fill: PropTypes.string
};

export default HeartIcon;
