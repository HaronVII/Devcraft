// src/contexts/ProgressContext.tsx
import { createContext, useContext, ReactNode } from 'react';

type ProgressContextType = {
  // Можно добавить новые свойства позже
};

const ProgressContext = createContext<ProgressContextType>({});

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressContext.Provider value={{}}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);