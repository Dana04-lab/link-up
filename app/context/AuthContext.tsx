'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

// Контекст типі кеңейтілді
interface AuthContextType {
  user: User | null;
  isLoaded: boolean;
}

// Контекстке isLoaded қосылды
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoaded: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoaded(true); // Жүктеу аяқталды
    }); 

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
