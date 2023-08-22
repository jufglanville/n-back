const SEQUENCE_VALUES = ['🥳', '🔥', '🚀', '🎸'];
const SEQUENCE_LENGTH = 15;

export const gameSetup = (): GameRound[] => {
  const gameRoundsArr: GameRound[] = [];
  for (let i = 0; i < SEQUENCE_LENGTH; i++) {
    const value =
      SEQUENCE_VALUES[Math.floor(Math.random() * SEQUENCE_VALUES.length)];

    gameRoundsArr.push({
      value,
      userCorrect: null,
    });
  }
  return gameRoundsArr;
};
