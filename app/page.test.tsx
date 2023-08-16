import { screen } from '@testing-library/react';
import { render, mockRender } from '@/test-utils';
import '@testing-library/jest-dom';

import Home from './page';

describe('Home page', () => {
  it('should render the enter a username button if no username set', () => {
    render(<Home />);

    expect(
      screen
        .getByRole('link', { name: /enter a username/i })
        .getAttribute('href')
    ).toBe('/username');
  });

  it('should render the welcome back message if a username is set', () => {
    mockRender(<Home />, { username: 'Test' });

    expect(screen.getByText(/welcome back test/i)).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /lets play!/i }).getAttribute('href')
    ).toBe('/gameplay');

    expect(
      screen.getByRole('link', { name: /not you?/i }).getAttribute('href')
    ).toBe('/username');
  });
});
