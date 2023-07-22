import React, { Dispatch } from 'react';
import { ActionType, Action } from './gameReducer';

interface Props {
  name: string;
  dispatch: Dispatch<Action>;
}

const StartScreen = ({ name, dispatch }: Props) => {
  const handleStartGame = () => {
    dispatch({ type: ActionType.START_GAME });
  };

  return (
    <div className="flex flex-col align-middle">
      <h1 className="text-center text-4xl mb-10">
        Are you ready to play {name}?
      </h1>

      <button
        onClick={handleStartGame}
        className="text-center  text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 transition-all"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
