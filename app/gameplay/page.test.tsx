import { screen, act } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GamePlay from './page';

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const mockGameRounds = [
  { value: 'a', userCorrect: null },
  { value: 'b', userCorrect: null },
  { value: 'c', userCorrect: null },
  { value: 'd', userCorrect: null },
  { value: 'c', userCorrect: null },
];

jest.mock('../../utils/gameSetup', () => ({
  gameSetup: () => mockGameRounds,
}));

describe('GamePlay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the game play page with initial set up screens', () => {
    render(<GamePlay />);

    expect(screen.getByText(/get ready/i)).toBeInTheDocument();
    expect(screen.getByText(mockGameRounds[0].value)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(2500));

    expect(screen.getByText(/get ready/i)).toBeInTheDocument();
    expect(screen.getByText(mockGameRounds[1].value)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

  it('should render a button on the first round', async () => {
    render(<GamePlay />);

    act(() => jest.advanceTimersByTime(2500));
    act(() => jest.advanceTimersByTime(2500));

    expect(screen.getByText(/round 1/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /select/i })).toBeInTheDocument();
  });

  it('should lose a life if user gets incorrect answer', async () => {
    const user = userEvent.setup({ delay: null });

    render(<GamePlay />);

    act(() => jest.advanceTimersByTime(2500));
    act(() => jest.advanceTimersByTime(2500));

    expect(screen.getByText('c')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /select/i }));
    await user.click(screen.getByRole('button', { name: /select/i }));

    act(() => jest.advanceTimersByTime(2500));

    expect(screen.getByText(/❤️/i));
  });

  it('should navigate to the results page when the user loses all lives', async () => {
    const user = userEvent.setup({ delay: null });

    render(<GamePlay />);

    act(() => jest.advanceTimersByTime(2500));
    act(() => jest.advanceTimersByTime(2500));

    await user.click(screen.getByRole('button', { name: /select/i }));

    act(() => jest.advanceTimersByTime(2500));

    expect(screen.getByText(/❤️/i));

    await user.click(screen.getByRole('button', { name: /select/i }));

    act(() => jest.advanceTimersByTime(2500));

    expect(mockRouterPush).toHaveBeenCalledWith('/gameplay/results');
  });

  it('should navigate to the results page when the user completes all rounds', async () => {
    const user = userEvent.setup({ delay: null });

    render(<GamePlay />);

    act(() => jest.advanceTimersByTime(2500));
    act(() => jest.advanceTimersByTime(2500));
    act(() => jest.advanceTimersByTime(2500));
    act(() => jest.advanceTimersByTime(2500));

    await user.click(screen.getByRole('button', { name: /select/i }));

    act(() => jest.advanceTimersByTime(2500));

    expect(mockRouterPush).toHaveBeenCalledWith('/gameplay/results');
  });
});
