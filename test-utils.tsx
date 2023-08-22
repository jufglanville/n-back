import React from 'react';
import { render } from '@testing-library/react';
import GameProvider, { GameContext } from '@/context/GameContext';

type AllTheProvidersProps = {
  children: React.ReactNode;
};

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <GameProvider>{children}</GameProvider>;
};

type MockTheProvidersProps = {
  children: React.ReactNode;
  customContext?: any;
};

const MockTheProviders = ({
  children,
  customContext,
}: MockTheProvidersProps) => {
  return (
    <GameContext.Provider value={{ ...customContext }}>
      {children}
    </GameContext.Provider>
  );
};

const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const customRenderWithMockContext = (
  ui: React.ReactElement,
  customContext: any,
  options?: any
) =>
  render(ui, {
    wrapper: () => MockTheProviders({ customContext, children: ui }),
    ...options,
  });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, customRenderWithMockContext as mockRender };
