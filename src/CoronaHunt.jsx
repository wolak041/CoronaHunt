import * as React from 'react';
import styles from './assets/styles/CoronaHunt.module.scss';
import Virus from './Virus';
import GameStats from './GameStats';

class CoronaHunt extends React.Component {
   constructor(props) {
      super(props);

      this.maxHealth = 5;

      this.state = {
         stage: 0,
         virusesKilled: 0,
         virusesPassed: 0,
         health: this.maxHealth,
         isGameStarted: false,
         isStageEnded: false,
         isGameLost: false,
         isGameWon: false
      }

      this.stages = [
         [7, 1, 5, 7],
         [9, 2, 5, 8],
         [10, 3, 5, 9],
         [15, 8, 5, 10],
         [34, 20, 5, 14],
         [40, 25, 5, 14],
         [50, 30, 5, 14],
         [60, 35, 5, 14],
      ];

      this.virusesTotal = this.stages
         .reduce((totalViruses, [stageViruses]) =>
            totalViruses = totalViruses + stageViruses
            , 0);

      this.shootingBoardRef = React.createRef();
      this.crosshairRef = React.createRef();
   }

   componentDidUpdate(prevProps, prevState) {
      const { health, virusesKilled, virusesPassed, isGameLost, isStageEnded } = this.state;

      if (!isGameLost && prevState.isStageEnded !== isStageEnded && this.virusesTotal === virusesKilled + virusesPassed) this.gameWon();
      if (prevState.health !== health && health === 0) this.gameLost();
   }

   handleStartGameClick = () => {
      this.setState({ isGameStarted: true });
   }

   handleRestartGameClick = () => {
      this.setState({
         stage: 0,
         virusesKilled: 0,
         virusesPassed: 0,
         health: this.maxHealth,
         isGameStarted: false,
         isStageEnded: false,
         isGameLost: false,
         isGameWon: false
      }, this.handleStartGameClick);
   }

   handleRemoveVirus = () => {
      this.setState((prevState) => {
         if (!prevState.isGameLost) {
            return {
               virusesKilled: prevState.virusesKilled + 1
            }
         }
      }, this.endStage);
   }

   handleAnimationEnd = () => {
      this.setState((prevState) => {
         if (this.state.health > 0) {
            return {
               virusesPassed: prevState.virusesPassed + 1,
               health: prevState.health - 1
            }
         }
      }, this.endStage);
   }

   handleNextStage = () => {
      this.setState((prevState) => {
         if (prevState.stage < this.stages.length - 1) {
            return {
               stage: prevState.stage + 1,
               isStageEnded: false
            }
         }
      });
   }

   endStage() {
      const { stage, virusesPassed, virusesKilled } = this.state;
      const virusesTillActualStage = [...this.stages]
         .splice(0, stage + 1)
         .reduce((totalViruses, [stageViruses]) =>
            totalViruses = totalViruses + stageViruses
            , 0);

      if (virusesPassed + virusesKilled === virusesTillActualStage) this.setState({ isStageEnded: true });
   }

   gameLost() {
      this.setState({ isGameLost: true });
   }

   gameWon() {
      this.setState({ isGameWon: true });
   }

   render() {
      const { isGameStarted, stage, health, virusesKilled, isStageEnded, isGameLost, isGameWon } = this.state;
      const viruses = [...Array(this.stages[stage][0]).keys()]

      return (
         <div className={styles.container}>
            <div className={`${styles.border} ${styles.borderLeft}`} />
            <div className={`${styles.border} ${styles.borderRight}`} />
            <div
               className={styles.shootingBoard}
               ref={this.shootingBoardRef}
            >
               {isGameStarted
                  ? viruses.map((virusId) =>
                     <Virus
                        virusId={virusId}
                        stage={stage}
                        animationProperties={{
                           maxDelay: this.stages[stage][1],
                           minDuration: this.stages[stage][2],
                           maxDuration: this.stages[stage][3]
                        }}
                        handleRemoveVirus={this.handleRemoveVirus}
                        handleAnimationEnd={this.handleAnimationEnd}
                        key={virusId}
                     />
                  )
                  : <div className={styles.mainButtonWrapper}>
                     <button
                        className={styles.mainButton}
                        onClick={this.handleStartGameClick}
                     >Start Game</button>
                  </div>
               }
               {isStageEnded && stage < this.stages.length - 1 && !isGameLost &&
                  <div className={styles.mainButtonWrapper}>
                     <button
                        className={styles.mainButton}
                        onClick={this.handleNextStage}
                     >Start next stage</button>
                  </div>
               }
               {isGameLost &&
                  <div className={styles.endMessage}>
                     💀 You lose fight against coronavirus 💀
                  </div>
               }
               {isGameWon &&
                  <div className={styles.endMessage}>
                     🔥 Congratulations, you won fight against coronavirus 🔥
                  </div>
               }
            </div>
            <GameStats
               maxHealth={this.maxHealth}
               health={health}
               actualStage={stage + 1}
               stagesCount={this.stages.length}
               virusesKilled={virusesKilled}
               handleRestartGameClick={this.handleRestartGameClick}
            />
         </div>
      );
   }
}

export default CoronaHunt;
