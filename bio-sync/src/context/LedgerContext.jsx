import React, { createContext, useContext, useState, useEffect } from 'react';

const LedgerContext = createContext();

export const useLedger = () => useContext(LedgerContext);

export const LedgerProvider = ({ children }) => {
  const [identities, setIdentities] = useState(() => {
    const saved = localStorage.getItem('lumina_ledger');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeIdentity, setActiveIdentity] = useState(null);

  useEffect(() => {
    localStorage.setItem('lumina_ledger', JSON.stringify(identities));
  }, [identities]);

  const syncIdentity = (data) => {
    const newIdentity = {
      ...data,
      id: `SYNC-${Date.now()}`,
      timestamp: new Date().toISOString(),
      hash: Math.random().toString(36).substring(2, 15), // Simulated hash
    };
    setIdentities((prev) => [newIdentity, ...prev]);
    setActiveIdentity(newIdentity);
    return newIdentity;
  };

  const deleteFromLedger = (id) => {
    setIdentities((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <LedgerContext.Provider value={{ 
      identities, 
      activeIdentity, 
      setActiveIdentity, 
      syncIdentity,
      deleteFromLedger 
    }}>
      {children}
    </LedgerContext.Provider>
  );
};
