import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './assets/styles/CoronaHunt.module.scss';
import virusImg from './assets/images/virus.png';

class Virus extends React.Component {
   constructor(props) {
      super(props);

      this.style = this.updateVirusStyle();
      this.virusRef = React.createRef();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.stage !== this.props.stage) {
         this.virusRef.current.style.display = 'block';
      }
   }

   handleRemoveVirus = () => {
      this.props.handleRemoveVirus();
      this.virusRef.current.style.display = 'none';
      this.style = this.updateVirusStyle();
   }

   handleAnimationEnd = () => {
      this.props.handleAnimationEnd();
      this.virusRef.current.style.display = 'none';
      this.style = this.updateVirusStyle();
   }

   updateVirusStyle() {
      const { maxDelay, minDuration, maxDuration } = this.props.animationProperties;
      const virusSize = 50;
      const containerWidthOffset = 20;
      const left = containerWidthOffset;
      const right = window.innerWidth - virusSize - containerWidthOffset;

      return {
         left: `${this.getRandomNumber(left, right)}px`,
         animationDelay: `${this.getRandomNumber(0, maxDelay)}s`,
         animationDuration: `${this.getRandomNumber(minDuration, maxDuration)}s`
      }
   }

   getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   render() {
      return (
         <div
            className={styles.virus}
            onMouseDown={this.handleRemoveVirus}
            onAnimationEnd={this.handleAnimationEnd}
            ref={this.virusRef}
            style={this.style}
         >
            <img src={virusImg} alt="virus" />
         </div>
      );
   }
}
Virus.propTypes = {
   handleRemoveVirus: PropTypes.func,
   handleAnimationEnd: PropTypes.func,
   virusId: PropTypes.number,
   stage: PropTypes.number,
   animationProperties: PropTypes.shape({
      maxDelay: PropTypes.number,
      minDuration: PropTypes.number,
      maxDuration: PropTypes.number
   })
};

export default Virus;
