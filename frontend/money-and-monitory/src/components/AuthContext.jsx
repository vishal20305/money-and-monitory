// AuthContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Create the AuthProvider component
export function AuthProvider({ children }) {
  const [clientId, setClientId] = useState(null); // Initialize clientId with null

  // Memoize the value object
  const contextValue = useMemo(() => ({ clientId, setClientId }), [clientId]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Create a custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
