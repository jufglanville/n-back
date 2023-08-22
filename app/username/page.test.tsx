import { screen } from '@testing-library/react';
import { render, mockRender } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Username from './page';

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe('Username', () => {
  it('should render the username page', () => {
    render(<Username />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should run setUsername with the value of the input when the form is submitted', async () => {
    const user = userEvent.setup();
    const mockSetUsername = jest.fn();

    mockRender(<Username />, { setUsername: mockSetUsername });

    await user.type(screen.getByRole('textbox'), 'test');
    await user.click(screen.getByRole('button', { name: /enter/i }));

    expect(mockSetUsername).toHaveBeenCalledWith('test');
    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });
});
