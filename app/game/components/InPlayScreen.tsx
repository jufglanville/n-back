import React, { Dispatch } from 'react';
import { ActionType, Action, GameRound } from '../gameReducer';

interface Props {
  gameRounds: GameRound[];
  currentGameRound: number;
  nBack: number;
  dispatch: Dispatch<Action>;
}

export const InPlayScreen = ({
  gameRounds,
  currentGameRound,
  nBack,
  dispatch,
}: Props) => {
  const selectElement = () => {
    dispatch({ type: ActionType.SELECT_ELEMENT });
  };

  const playableRound = currentGameRound - (nBack - 1);

  return (
    <div className="flex flex-col align-middle">
      <p className="text-xl text-center mb-5">
        {playableRound > 0 ? `Round ${playableRound}` : 'Get Ready'}
      </p>
      <p className="text-4xl text-center mb-5">
        {gameRounds[currentGameRound].sequenceValue}
      </p>
      {playableRound > 0 && (
        <button
          onClick={selectElement}
          className="text-center  text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 active:bg-slate-900 active:shadow-xl transition-all"
        >
          Select
        </button>
      )}
      {playableRound <= 0 && (
        <div
          onClick={selectElement}
          className="text-center rounded py-2 px-4 bg-slate-600 text-slate-100"
        >
          {nBack - (playableRound + 1)}
        </div>
      )}
    </div>
  );
};
