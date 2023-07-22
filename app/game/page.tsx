'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useReducer } from 'react';
import { gameReducer, initialState, ActionType } from './gameReducer';
import ResultsScreen from './ResultsScreen';
import StartScreen from './StartScreen';
import InPlayScreen from './InPlayScreen';
import Lives from './Lives';

const pages = () => {
  const numberLives = 2;
  const username = useSearchParams().get('userName') as string;
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { incorrect, sequence, currentElementIndex, inPlay, finished } = state;

  useEffect(() => {
    if (!inPlay) return;

    const timeout = setTimeout(() => {
      dispatch({ type: ActionType.FINISH_ROUND });

      if (
        currentElementIndex >= sequence.length - 1 ||
        incorrect >= numberLives
      ) {
        dispatch({ type: ActionType.END_GAME });
        return;
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [currentElementIndex, sequence, inPlay]);

  if (finished) {
    return <ResultsScreen state={state} dispatch={dispatch} />;
  }

  if (!inPlay) {
    return <StartScreen name={username} dispatch={dispatch} />;
  }

  return (
    <div className="flex flex-col items-center">
      <Lives lives={numberLives} incorrect={incorrect} />
      <InPlayScreen
        sequence={sequence}
        currentElementIndex={currentElementIndex}
        dispatch={dispatch}
      />
    </div>
  );
};

export default pages;
