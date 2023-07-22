import React, { useEffect, useReducer, useState } from 'react';

const EMOJIS = ['🥳', '🔥', '🚀', '🎸'];
const SEQUENCE_LENGTH = 15;
const N_BACK = 2;

export enum ActionType {
  START_GAME = 'START_GAME',
  END_GAME = 'END_GAME',
  SELECT_ELEMENT = 'SELECT_ELEMENT',
  FINISH_ROUND = 'FINISH_ROUND',
}

export interface Action {
  type: ActionType;
}

export const initialState = {
  sequence: [] as string[],
  results: [] as number[],
  usersEntry: [] as number[],
  currentElementIndex: 0,
  inPlay: false,
  finished: false,
  userSelected: false,
  roundResult: false as boolean | null,
  incorrect: 0,
};

type StateType = typeof initialState;

export const gameReducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case 'START_GAME':
      const newSequence = Array.from(
        { length: SEQUENCE_LENGTH },
        () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      );

      const results: number[] = [];
      newSequence.forEach((emoji, i) => {
        if (i < N_BACK) return;
        emoji === newSequence[i - N_BACK] ? results.push(1) : results.push(-1);
      });

      return {
        ...initialState,
        sequence: newSequence,
        results,
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
      const { currentElementIndex, sequence, userSelected } = state;

      // If the round is under the N_BACK value then we don't need to do anything
      if (currentElementIndex < N_BACK)
        return { ...state, currentElementIndex: currentElementIndex + 1 };

      const currentElement = sequence[currentElementIndex];
      const isCorrect =
        sequence[currentElementIndex - N_BACK] === currentElement;
      const usersEntry = [...state.usersEntry, userSelected ? 1 : -1];
      const roundResult = userSelected === isCorrect;

      return {
        ...state,
        userSelected: false,
        usersEntry,
        currentElementIndex: currentElementIndex + 1,
        roundResult,
        incorrect: roundResult ? state.incorrect : state.incorrect + 1,
      };
    default:
      return state;
  }
};
