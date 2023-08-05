'use client';

import { createContext, useState } from 'react';

type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

const UserProvider = ({ children }: UserContextProviderProps) => {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
