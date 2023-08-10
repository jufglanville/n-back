import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GameProvider, { GameContext } from '@/context/GameContext';

import Username from './page';

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const renderUsername = () => {
  return render(
    <GameProvider>
      <Username />
    </GameProvider>
  );
};

describe('Username', () => {
  it('should render the username page', () => {
    renderUsername();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should run setUsername with the value of the input when the form is submitted', () => {
    const user = userEvent.setup();
    const mockSetUsername = jest.fn();

    const mockContextValue = {
      username: '',
      gameRounds: [],
      setUsername: mockSetUsername,
      setGameRounds: jest.fn(),
    };

    render(
      <GameContext.Provider value={mockContextValue}>
        <Username />
      </GameContext.Provider>
    );

    user.type(screen.getByRole('textbox'), 'test');
    user.click(screen.getByRole('button', { name: /enter/i }));

    waitFor(() => {
      expect(mockSetUsername).toHaveBeenCalledWith('test');
      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
  });
});
