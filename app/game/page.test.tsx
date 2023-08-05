import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Game from './page';

// Mock the gameSetup function
jest.mock('./gameReducer', () => ({
  ...jest.requireActual('./gameReducer'),
  gameSetup: jest.fn(() => ['a', 'b', 'a', 'a']),
}));

describe('Game page', () => {
  it('should render the start screen', () => {
    render(<Game />);

    const btn = screen.getByRole('button', {
      name: /start game/i,
    });

    expect(btn).toBeInTheDocument();
  });

  it('should start the game when the start button is clicked', async () => {
    const user = userEvent.setup();
    render(<Game />);

    const btn = screen.getByRole('button', {
      name: /start game/i,
    });

    await user.click(btn);

    screen.logTestingPlaygroundURL();

    // expect(lives).toBeInTheDocument();
  });

  it('should start the game when and update between rounds', async () => {
    const user = userEvent.setup();
    render(<Game />);

    const btn = screen.getByRole('button', {
      name: /start game/i,
    });

    await user.click(btn);

    await waitFor(
      () => {
        expect(screen.getByText(/round 1/i)).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );

    screen.logTestingPlaygroundURL();
  });
});
