'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { GameContext } from '../../../context/GameContext';
import { GameRoundResult } from './components/GameRoundResult';

const Results = () => {
  const { gameRounds } = useContext(GameContext);

  const answers = gameRounds.reduce(
    (acc, curr) => {
      if (curr.userCorrect === null) return acc;

      if (curr.userCorrect) {
        return {
          ...acc,
          correct: acc.correct + 1,
          attempted: acc.attempted + 1,
        };
      } else {
        return {
          ...acc,
          inCorrect: acc.inCorrect + 1,
          attempted: acc.attempted + 1,
        };
      }
    },
    { correct: 0, inCorrect: 0, attempted: 0 }
  );

  const successRate = Math.round(
    (answers.correct / (answers.correct + answers.inCorrect)) * 100
  );

  return (
    <div className="flex flex-col align-middle">
      <h1 className="text-center text-4xl mb-5">Game Over</h1>

      <p className="text-center mb-2">
        You got {answers.correct} correct and {answers.inCorrect} wrong and
        reached round {answers.attempted}
      </p>
      <p className="text-center mb-5">
        That&apos;s a {successRate}% success rate!
      </p>

      <h2 className="text-center text-2xl">Results</h2>
      <table className="mb-10">
        <thead>
          <tr>
            <th className="p-2 text-xs sm:text-base">Round</th>
            <th className="p-2 text-xs sm:text-base">Result</th>
          </tr>
        </thead>
        <tbody>
          {gameRounds
            .slice(0, answers.attempted + 2)
            .map((gameRound: GameRound, index: number) => {
              return (
                <GameRoundResult
                  key={index}
                  gameRound={gameRound}
                  index={index}
                />
              );
            })}
        </tbody>
      </table>

      <Link
        href="/gameplay"
        className="text-center text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 transition-all"
      >
        Play Again
      </Link>
      <Link
        href="/username"
        className="text-right text-sm italic mt-2 hover:underline transition-all"
      >
        Enter new User
      </Link>
    </div>
  );
};

export default Results;
