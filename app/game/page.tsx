'use client';

import { useEffect, useReducer, useContext } from 'react';
import { gameReducer, initialState, ActionType } from './gameReducer';
import { ResultsScreen } from './components/ResultsScreen';
import { StartScreen } from './components/StartScreen';
import { InPlayScreen } from './components/InPlayScreen';
import { Lives } from './components/Lives';
import { UserContext } from '../../context/UserContext';

const pages = () => {
  const { username } = useContext(UserContext);
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { lives, gameRounds, currentGameRound, nBack, inPlay, finished } =
    state;

  useEffect(() => {
    if (!inPlay) return;

    const timeout = setTimeout(() => {
      dispatch({ type: ActionType.FINISH_ROUND });
      if (currentGameRound >= gameRounds.length - 1) {
        dispatch({ type: ActionType.END_GAME });
        return;
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [currentGameRound, gameRounds, inPlay]);

  if (finished) {
    return (
      <ResultsScreen
        gameRounds={gameRounds}
        currentGameRound={currentGameRound}
        nBack={nBack}
        dispatch={dispatch}
      />
    );
  }

  if (!inPlay) {
    return <StartScreen name={username} dispatch={dispatch} />;
  }

  return (
    <div className="flex flex-col items-center">
      <Lives lives={lives} />
      <InPlayScreen
        gameRounds={gameRounds}
        currentGameRound={currentGameRound}
        nBack={nBack}
        dispatch={dispatch}
      />
    </div>
  );
};

export default pages;
