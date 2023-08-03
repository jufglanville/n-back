'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useReducer } from 'react';
import { gameReducer, initialState, ActionType } from './gameReducer';
import ResultsScreen from './ResultsScreen';
import StartScreen from './StartScreen';
import InPlayScreen from './InPlayScreen';
import Lives from './Lives';

const pages = () => {
  const username = useSearchParams().get('userName') as string;
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { lives, sequence, currentElementIndex, inPlay, finished } = state;

  useEffect(() => {
    if (!inPlay) return;

    const timeout = setTimeout(() => {
      if (currentElementIndex >= sequence.length - 1) {
        dispatch({ type: ActionType.END_GAME });
        return;
      }
      dispatch({ type: ActionType.FINISH_ROUND });
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
      <h1 className="text-4xl font-bold">Lives: {lives}</h1>
      <Lives lives={lives} />
      <InPlayScreen
        sequence={sequence}
        currentElementIndex={currentElementIndex}
        dispatch={dispatch}
      />
    </div>
  );
};

export default pages;
