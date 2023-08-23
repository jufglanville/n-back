'use client';

import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { GameContext } from '../../context/GameContext';
import { Lives } from './components/Lives';
import axios from 'axios';

const GamePlay = () => {
  const [lifeCount, setLifeCount] = useState(2);
  const [currentRound, setCurrentRound] = useState(0);
  const userSelectedRef = useRef(false);
  const { gameRounds, setGameRounds } = useContext(GameContext);

  const router = useRouter();

  useEffect(() => {
    const setupGameRounds = async () => {
      const res = await axios.get<GameRound[]>('/api/gamesetup');
      setGameRounds(res.data);
    };

    setupGameRounds();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleRound(userSelectedRef.current);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [currentRound]);

  const handleRound = (userSelected: boolean) => {
    if (currentRound < 2) {
      setCurrentRound(currentRound + 1);
      return;
    }

    const updatedGameRounds = [...gameRounds];
    let updatedLifeCount = lifeCount;

    const isMatch =
      gameRounds[currentRound].value === gameRounds[currentRound - 2].value;

    const isUserCorrect =
      (isMatch && userSelected) || (!isMatch && !userSelected);

    updatedGameRounds[currentRound].userCorrect = isUserCorrect;

    if (!isUserCorrect) {
      updatedLifeCount = lifeCount - 1;
    }

    setGameRounds(updatedGameRounds);
    setLifeCount(updatedLifeCount);
    userSelectedRef.current = false;

    if (currentRound < gameRounds.length - 1 && updatedLifeCount > 0) {
      setCurrentRound(currentRound + 1);
    } else {
      router.push('/gameplay/results');
    }
  };

  const handleSelectButtonClick = () => {
    userSelectedRef.current = true;
  };

  if (!gameRounds || !gameRounds.length) {
    return <div>Loading...</div>;
  }

  const playableRound = currentRound - 1 > 0;

  return (
    <div className="flex flex-col items-center">
      <Lives lives={lifeCount} />
      <div className="flex flex-col align-middle">
        <p className="text-xl text-center mb-5">
          {playableRound ? `Round ${currentRound - 1}` : 'Get Ready'}
        </p>
        <p className="text-4xl text-center mb-5">
          {gameRounds[currentRound].value}
        </p>

        {playableRound ? (
          <button
            onClick={handleSelectButtonClick}
            className="text-center  text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 active:bg-slate-900 active:shadow-xl transition-all"
          >
            Select
          </button>
        ) : (
          <div className="text-center rounded py-2 px-4 bg-slate-600 text-slate-100">
            {2 - currentRound}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePlay;
