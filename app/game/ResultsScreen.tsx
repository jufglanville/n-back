import React, { Dispatch } from 'react';
import { ActionType, Action } from './gameReducer';

interface Props {
  state: any;
  dispatch: Dispatch<Action>;
}

const ResultsScreen = ({ state, dispatch }: Props) => {
  const { incorrect, sequence, currentElementIndex, inPlay, finished } = state;

  const correctAnswers = state.usersEntry.map(
    (result: number, index: number) => {
      if (result === state.results[index]) {
        return 'Correct';
      } else {
        return 'Wrong';
      }
    }
  );

  const handleStartGame = () => {
    dispatch({ type: ActionType.START_GAME });
  };

  return (
    <div className="flex flex-col align-middle">
      <h1 className="text-center text-4xl mb-5">Game Over</h1>

      <p className="mb-10">
        There were {state.sequence.length - 2} trials in total in this game
      </p>

      <h2 className="text-center text-xl mb-2">Your Results:</h2>
      <table className="mb-10">
        <thead>
          <tr>
            <th>Round</th>
            <th>Sequence</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {correctAnswers.map((result: string, index: number) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{sequence[index + 2]}</td>
              <td className="text-center">{result}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleStartGame}
        className="text-center text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 transition-all"
      >
        Play Again
      </button>
    </div>
  );
};

export default ResultsScreen;
