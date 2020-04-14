import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './CoronaHunt.module.scss';

class GameStats extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const { actualStage, stagesCount, health, virusesKilled} = this.props;

      return (
         <div className={styles.stats}>
            <div className={styles.controls}>
               <div>
                  <button
                     onClick={this.props.handleExitGameClick}
                     >Exit game</button>
               </div>
               <div>
                  <button
                     onClick={this.props.handleRestartGameClick}
                     >Restart game</button>
               </div>
            </div>
            <div className={styles.statsElement}>
               <div>Health</div>
               <div className={styles.healthBar}>{health}%</div>
            </div>
            <div className={styles.statsElement}>
               <div>Stage</div>
               <div>{actualStage}/{stagesCount}</div>
            </div>
            <div className={styles.statsElement}>
               <div>Viruses destroyed</div>
               <div>{virusesKilled}</div>
            </div>
         </div>
      );
   }
}

GameStats.propTypes = {
   handleExitGameClick: PropTypes.func,
   handleRestartGameClick: PropTypes.func,
   health: PropTypes.number,
   actualStage: PropTypes.number,
   stagesCount: PropTypes.number,
   virusesKilled: PropTypes.number
};

export default GameStats;
