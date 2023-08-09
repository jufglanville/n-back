import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GameContext } from '../../../context/GameContext';
import Results from './page';

const mockGameRounds = [
  { value: 'a', userCorrect: null },
  { value: 'b', userCorrect: null },
  { value: 'c', userCorrect: true },
  { value: 'd', userCorrect: true },
  { value: 'c', userCorrect: false },
  { value: 'd', userCorrect: null },
];

const renderResults = () => {
  return render(
    <GameContext.Provider
      value={{
        gameRounds: mockGameRounds,
        setGameRounds: () => {},
        username: '',
        setUsername: (username: string) => {},
      }}
    >
      <Results />
    </GameContext.Provider>
  );
};

describe('Results page', () => {
  it('Displays the number of correct and incorrect answers and round reached', () => {
    renderResults();

    screen.getByText(/you got 2 correct and 1 wrong and reached round 3/i);
  });

  it('Displays the percentage of correct answers', () => {
    renderResults();

    screen.getByText(/67%/i);
  });

  it('Displays a table of the rounds and whether the user was correct or not', () => {
    renderResults();

    const roundOneRow = screen.getByRole('row', { name: /1/i });
    const roundTwoRow = screen.getByRole('row', { name: /2/i });
    const roundThreeRow = screen.getByRole('row', { name: /3/i });

    expect(within(roundOneRow).getByRole('cell', { name: /✅/i }));
    expect(within(roundTwoRow).getByRole('cell', { name: /✅/i }));
    expect(within(roundThreeRow).getByRole('cell', { name: /❌/i }));
  });

  it('Navigates the user back to the game if they click the play again button', async () => {
    renderResults();

    const playAgainButton = screen.getByRole('link', { name: /play again/i });

    expect(playAgainButton.getAttribute('href')).toBe('/gameplay');
  });

  it('Navigates the user to the username page if they click the enter new user button', async () => {
    renderResults();

    const enterNewUserButton = screen.getByRole('link', {
      name: /enter new user/i,
    });

    expect(enterNewUserButton.getAttribute('href')).toBe('/username');
  });
});
