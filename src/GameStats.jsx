import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './assets/styles/CoronaHunt.module.scss';
import crosshair from './assets/images/crosshair.svg';
import HeartIcon from './HeartIcon';

function GameStats(props) {
   const { actualStage, stagesCount, maxHealth, health, virusesKilled} = props;

   return (
      <div className={styles.stats}>
         <div className={styles.controls}>
            {/* <div>
               <button
                  onClick={props.handleExitGameClick}
                  >Exit game</button>
            </div> */}
            <div>
               <button
                  onClick={props.handleRestartGameClick}
                  >Restart game</button>
            </div>
         </div>
         <div className={styles.statsElement}>
            <div>Health</div>
            <div className={styles.hearts}>
               {[...Array(maxHealth).keys()].map((heartNumber) => 
                  <HeartIcon 
                     width={18}
                     height={18}
                     fill={heartNumber < health ? 'red' : 'black'}
                     key={heartNumber}
                  />
               )}
            </div>
         </div>
         <div className={styles.statsElement}>
            <div>Stage</div>
            <div>{actualStage}/{stagesCount}</div>
         </div>
         <div className={styles.statsElement}>
            <div>Viruses destroyed</div>
            <div className={styles.virusesKilled}>
               <img src={crosshair} alt="crosshair" width="17" height="17"/>
               <span>{virusesKilled}</span>
            </div>
         </div>
      </div>
   );
}

GameStats.propTypes = {
   // handleExitGameClick: PropTypes.func,
   handleRestartGameClick: PropTypes.func,
   maxHealth: PropTypes.number,
   health: PropTypes.number,
   actualStage: PropTypes.number,
   stagesCount: PropTypes.number,
   virusesKilled: PropTypes.number
};

export default GameStats;
