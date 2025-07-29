import React, { createContext, useContext, useState } from 'react';

// Define user roles
export type UserRole = 'student' | 'mentor' | 'professional';

// Example user objects for each role
const exampleUsers = {
  student: {
    name: 'Alice Student',
    email: 'alice@student.com',
    role: 'student',
    grade: '10th',
  },
  mentor: {
    name: 'Bob Mentor',
    email: 'bob@mentor.com',
    role: 'mentor',
    expertise: ['AI', 'Math'],
  },
  professional: {
    name: 'Carol Professional',
    email: 'carol@pro.com',
    role: 'professional',
    company: 'TechCorp',
  },
};

// AuthContext type
interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with no user logged in
  const [user, setUser] = useState<any>(null);
  const isAuthenticated = !!user;

  // Function to switch user role (for demo/testing)
  const switchRole = (role: UserRole) => {
    setUser(exampleUsers[role]);
  };

  // Login function
  const login = (user: any) => {
    console.log('AuthContext: Logging in user:', user);
    setUser(user);
  };

  // Logout function
  const logout = () => {
    console.log('AuthContext: Logging out user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, switchRole, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};