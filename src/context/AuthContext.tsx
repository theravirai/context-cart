import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import type { User, LoginCredentials, RegisterData } from '../types/auth';

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from LocalStorage
  useEffect(() => {
    const sessionStr = localStorage.getItem('context-cart-session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        setUser(session);
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Helper to get users from LocalStorage mock DB
  const getUsers = (): User[] => {
    const usersStr = localStorage.getItem('context-cart-users');
    return usersStr ? JSON.parse(usersStr) : [];
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate network delay for realism
      setTimeout(() => {
        const users = getUsers();
        const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);
        
        if (foundUser) {
          const { password, ...sessionUser } = foundUser;
          setUser(sessionUser);
          localStorage.setItem('context-cart-session', JSON.stringify(sessionUser));
          resolve();
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 600);
    });
  };

  const register = async (data: RegisterData): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        const users = getUsers();
        if (users.some(u => u.email === data.email)) {
          reject(new Error("Account with this email already exists"));
          return;
        }

        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          ...data
        };

        // Save to Mock DB
        users.push(newUser);
        localStorage.setItem('context-cart-users', JSON.stringify(users));

        // Auto login after registration
        const { password, ...sessionUser } = newUser;
        setUser(sessionUser);
        localStorage.setItem('context-cart-session', JSON.stringify(sessionUser));
        
        resolve();
      }, 600);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('context-cart-session');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
