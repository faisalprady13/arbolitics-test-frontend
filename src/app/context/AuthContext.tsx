'use client';

import { createContext, useContext, useState } from 'react';

type authContextType = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<authContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => setUser(username);

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
