import { screen, within } from '@testing-library/react';
import { mockRender } from '@/test-utils';
import '@testing-library/jest-dom';
import Results from './page';

const mockGameRounds = {
  gameRounds: [
    { value: 'a', userCorrect: null },
    { value: 'b', userCorrect: null },
    { value: 'c', userCorrect: true },
    { value: 'd', userCorrect: true },
    { value: 'c', userCorrect: false },
    { value: 'd', userCorrect: null },
  ],
};

describe('Results page', () => {
  it('Displays the number of correct and incorrect answers and round reached', () => {
    mockRender(<Results />, mockGameRounds);

    screen.getByText(/you got 2 correct and 1 wrong and reached round 3/i);
  });

  it('Displays the percentage of correct answers', () => {
    mockRender(<Results />, mockGameRounds);

    screen.getByText(/67%/i);
  });

  it('Displays a table of the rounds and whether the user was correct or not', () => {
    mockRender(<Results />, mockGameRounds);

    const roundOneRow = screen.getByRole('row', { name: /1/i });
    const roundTwoRow = screen.getByRole('row', { name: /2/i });
    const roundThreeRow = screen.getByRole('row', { name: /3/i });

    expect(within(roundOneRow).getByRole('cell', { name: /✅/i }));
    expect(within(roundTwoRow).getByRole('cell', { name: /✅/i }));
    expect(within(roundThreeRow).getByRole('cell', { name: /❌/i }));
  });

  it('Navigates the user back to the game if they click the play again button', async () => {
    mockRender(<Results />, mockGameRounds);

    const playAgainButton = screen.getByRole('link', { name: /play again/i });

    expect(playAgainButton.getAttribute('href')).toBe('/gameplay');
  });

  it('Navigates the user to the username page if they click the enter new user button', async () => {
    mockRender(<Results />, mockGameRounds);

    const enterNewUserButton = screen.getByRole('link', {
      name: /enter new user/i,
    });

    expect(enterNewUserButton.getAttribute('href')).toBe('/username');
  });
});
