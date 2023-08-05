import React, { Dispatch } from 'react';
import { ActionType, Action, GameRound } from '../gameReducer';
import Link from 'next/link';

interface Props {
  gameRounds: GameRound[];
  currentGameRound: number;
  nBack: number;
  dispatch: Dispatch<Action>;
}

export const ResultsScreen = ({
  gameRounds,
  currentGameRound,
  nBack,
  dispatch,
}: Props) => {
  const handleStartGame = () => {
    dispatch({ type: ActionType.START_GAME });
  };

  const noCorrectAnswers = gameRounds.filter(
    (round) =>
      round.userAnswer === round.sequenceAnswer && round.userAnswer !== null
  ).length;

  const noIncorrectAnswers = gameRounds.filter(
    (round) =>
      round.userAnswer !== round.sequenceAnswer && round.userAnswer !== null
  ).length;

  const successRate = Math.round(
    (noCorrectAnswers / (noCorrectAnswers + noIncorrectAnswers)) * 100
  );

  const gameResults = gameRounds.map((gameRound: GameRound, index: number) => {
    if (index < nBack) {
      return (
        <tr key={index} className="text-center text-sm sm:text-base">
          <td>{gameRound.sequenceValue}</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      );
    }

    if (gameRound.userAnswer === null) return;

    return (
      <tr key={index} className="text-center text-sm sm:text-base">
        <td>
          {index - nBack + 1}. {gameRound.sequenceValue}
        </td>
        <td>{gameRound.userAnswer ? 'Yes' : 'No'}</td>
        <td>{gameRound.sequenceAnswer ? 'Yes' : 'No'}</td>
        <td>
          {gameRound.userAnswer === gameRound.sequenceAnswer ? '✅' : '❌'}
        </td>
      </tr>
    );
  });

  return (
    <div className="flex flex-col align-middle">
      <h1 className="text-center text-4xl mb-5">Game Over</h1>

      <p className="text-center mb-2">
        There were {gameRounds.length - nBack} trials in total in this game
      </p>
      <p className="text-center mb-2">
        You got {noCorrectAnswers} correct and {noIncorrectAnswers} wrong
      </p>
      <p className="text-center mb-2">
        And reached round {currentGameRound - nBack}
      </p>
      <p className="text-center mb-5">That's a {successRate}% success rate!</p>

      <h2 className="text-center text-2xl">Results</h2>
      <table className="mb-10">
        <thead>
          <tr>
            <th className="p-2 text-xs sm:text-base">Round</th>
            <th className="p-2 text-xs sm:text-base">Your Answer</th>
            <th className="p-2 text-xs sm:text-base">Correct Answer</th>
            <th className="p-2 text-xs sm:text-base">Result</th>
          </tr>
        </thead>
        <tbody>{gameResults}</tbody>
      </table>

      <button
        onClick={handleStartGame}
        className="text-center text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 transition-all"
      >
        Play Again
      </button>
      <Link
        href="/username"
        className="text-right text-sm italic mt-2 hover:underline transition-all"
      >
        Enter new User
      </Link>
    </div>
  );
};
