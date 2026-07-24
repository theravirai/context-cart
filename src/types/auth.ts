export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Only stored in mock DB, omitted in active session state
}

export type LoginCredentials = Pick<User, 'email' | 'password'>;
export type RegisterData = Pick<User, 'name' | 'email' | 'password'>;
