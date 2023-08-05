const SEQUENCE_VALUES = ['🥳', '🔥', '🚀', '🎸'];
const SEQUENCE_LENGTH = 15;
const N_BACK = 2;
const LIVES = 2;

export enum ActionType {
  START_GAME = 'START_GAME',
  END_GAME = 'END_GAME',
  SELECT_ELEMENT = 'SELECT_ELEMENT',
  FINISH_ROUND = 'FINISH_ROUND',
}

export interface Action {
  type: ActionType;
}

export type GameRound = {
  sequenceValue: string;
  sequenceAnswer: boolean | null;
  userAnswer: boolean | null;
};

export const initialState = {
  gameRounds: [] as GameRound[],
  currentGameRound: 0,
  inPlay: false,
  finished: false,
  userSelected: false,
  lives: LIVES,
  nBack: N_BACK,
};

type StateType = typeof initialState;

export const gameSetup = (): GameRound[] => {
  console.log('gameSetup');
  const gameRoundsArr: GameRound[] = [];
  for (let i = 0; i < SEQUENCE_LENGTH; i++) {
    const sequenceValue =
      SEQUENCE_VALUES[Math.floor(Math.random() * SEQUENCE_VALUES.length)];

    let sequenceAnswer = null;
    if (i >= N_BACK) {
      sequenceAnswer =
        sequenceValue === gameRoundsArr[i - N_BACK].sequenceValue;
    }

    gameRoundsArr.push({
      sequenceValue,
      sequenceAnswer,
      userAnswer: null,
    });
  }
  return gameRoundsArr;
};

export const gameReducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        gameRounds: gameSetup(),
        inPlay: true,
      };
    case 'END_GAME':
      return {
        ...state,
        inPlay: false,
        finished: true,
      };
    case 'SELECT_ELEMENT':
      return {
        ...state,
        userSelected: true,
      };
    case 'FINISH_ROUND':
      const { gameRounds, currentGameRound, userSelected } = state;

      // If the round is under the N_BACK value then we don't need to do anything
      if (currentGameRound < N_BACK)
        return {
          ...state,
          currentGameRound: currentGameRound + 1,
        };

      gameRounds[currentGameRound].userAnswer = userSelected;

      const livesLeft =
        userSelected === gameRounds[currentGameRound].sequenceAnswer
          ? state.lives
          : state.lives - 1;

      return {
        ...state,
        gameRounds,
        userSelected: false,
        currentGameRound: currentGameRound + 1,
        lives: livesLeft,
        finished: livesLeft === 0 ? true : false,
        inPlay: livesLeft === 0 ? false : true,
      };
    default:
      return state;
  }
};
