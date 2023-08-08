'use client';

// import { GameRound } from '@/app/game/gameReducer';
import { createContext, useState } from 'react';

type GameContextType = {
  username: string;
  setUsername: (username: string) => void;
  gameRounds: GameRound[];
  setGameRounds: (gameRounds: GameRound[]) => void;
};

type GameContextProviderProps = {
  children: React.ReactNode;
};

export const GameContext = createContext({} as GameContextType);

const GameProvider = ({ children }: GameContextProviderProps) => {
  const [username, setUsername] = useState('');
  const [gameRounds, setGameRounds] = useState([] as GameRound[]);

  return (
    <GameContext.Provider
      value={{
        username,
        setUsername,
        gameRounds,
        setGameRounds,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
