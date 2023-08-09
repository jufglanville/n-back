import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useContext } from 'react';
import GameProvider, { GameContext } from './GameContext';

const round: GameRound[] = [{ value: 'test', userCorrect: false }];
const mockUsername = 'Jim';

const TestComponent = () => {
  const { gameRounds, setGameRounds, username, setUsername } =
    useContext(GameContext);

  return (
    <>
      <button onClick={() => setGameRounds(round)}>Set Game Rounds</button>
      {gameRounds.map((gameRound) => (
        <p key={gameRound.value}>{gameRound.value}</p>
      ))}

      <button onClick={() => setUsername(mockUsername)}>Set Username</button>
      <p>{username}</p>
    </>
  );
};

const renderTestComponent = () => {
  return render(
    <GameProvider>
      <TestComponent />
    </GameProvider>
  );
};

describe('GameContext', () => {
  it('should set and retrieve game rounds', async () => {
    const user = userEvent.setup();
    renderTestComponent();

    await user.click(screen.getByRole('button', { name: 'Set Game Rounds' }));

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should set and retrieve the users name', async () => {
    const user = userEvent.setup();
    renderTestComponent();

    await user.click(screen.getByRole('button', { name: 'Set Username' }));

    expect(screen.getByText(mockUsername)).toBeInTheDocument();
  });
});
