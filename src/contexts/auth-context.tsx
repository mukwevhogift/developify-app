'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'investor' | 'owner' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (role: 'investor' | 'owner' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers = {
  investor: { uid: "user123", email: "investor@example.com", displayName: "Demo Investor", role: 'investor' },
  owner: { uid: "user456", email: "owner@example.com", displayName: "Demo Owner", role: 'owner' },
  admin: { uid: "user789", email: "admin@example.com", displayName: "Demo Admin", role: 'admin' },
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking localStorage for a saved user session
    try {
      const savedUser = localStorage.getItem('developify-user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('developify-user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (role: 'investor' | 'owner' | 'admin') => {
    const userToLogin = mockUsers[role];
    setUser(userToLogin);
    localStorage.setItem('developify-user', JSON.stringify(userToLogin));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('developify-user');
  };
  
  if (isLoading) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
