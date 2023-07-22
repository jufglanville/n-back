import React, { Dispatch } from 'react';
import { ActionType, Action } from './gameReducer';

interface Props {
  sequence: string[];
  currentElementIndex: number;
  dispatch: Dispatch<Action>;
}

const InPlayScreen = ({ sequence, currentElementIndex, dispatch }: Props) => {
  const selectElement = () => {
    dispatch({ type: ActionType.SELECT_ELEMENT });
  };

  return (
    <div className="flex flex-col align-middle">
      <p className="text-xl text-center mb-5">
        Round {currentElementIndex + 1}
      </p>
      <p className="text-4xl text-center mb-5">
        {sequence[currentElementIndex]}
      </p>
      <button
        onClick={selectElement}
        className="text-center  text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 transition-all"
      >
        Select
      </button>
    </div>
  );
};

export default InPlayScreen;
