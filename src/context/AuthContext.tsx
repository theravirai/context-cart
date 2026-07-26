import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, RegisterData as RegisterCredentials } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const sessionStr = localStorage.getItem('context-cart-user');
    if (sessionStr) {
      try {
        return JSON.parse(sessionStr);
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    return null;
  });

  const login = async (credentials: LoginCredentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate finding a dummy user
    // Since we don't have a real backend, we'll just mock a successful login for any email
    const mockUser: User = {
      id: "1",
      name: credentials.email.split('@')[0],
      email: credentials.email
    };
    
    setUser(mockUser);
    localStorage.setItem('context-cart-user', JSON.stringify(mockUser));
  };

  const register = async (credentials: RegisterCredentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate user creation
    const mockUser: User = {
      id: String(Math.floor(Math.random() * 1000) + 1),
      name: credentials.name,
      email: credentials.email
    };
    
    setUser(mockUser);
    localStorage.setItem('context-cart-user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('context-cart-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
