// src/contexts/UserContext.js
"use client"; // This is a client-side context

import React, { createContext, useState, useContext } from 'react';

// Create the Context
export const UserContext = createContext(null);

// Create a Provider component
export function UserProvider({ children }) {
  // Simulate user role. In a real app, this would come from auth.
  // Possible values: 'admin', 'teacher', 'student', 'parent'
  const [currentUserRole, setCurrentUserRole] = useState('student'); // Change 'admin' to 'student', 'teacher', etc.

  const value = {
    currentUserRole,
    setCurrentUserRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Custom hook to use the UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}