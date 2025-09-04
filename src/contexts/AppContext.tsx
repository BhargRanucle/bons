import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Portfolio, Transaction, LinkedAccount } from '../types';

interface AppContextType {
  portfolio: Portfolio;
  transactions: Transaction[];
  linkedAccounts: LinkedAccount[];
  updatePortfolio: (portfolio: Portfolio) => void;
  addTransaction: (transaction: Transaction) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockPortfolio: Portfolio = {
  totalValue: 125750.50,
  availableFunds: 15230.75,
  turingTokens: 2500,
  totalReturns: 18750.50,
  returnPercentage: 17.5,
  positions: [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 50,
      avgPrice: 180.25,
      currentPrice: 192.30,
      marketValue: 9615.00,
      unrealizedPL: 602.50,
      unrealizedPLPercentage: 6.68
    },
    {
      id: '2',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 25,
      avgPrice: 140.50,
      currentPrice: 145.80,
      marketValue: 3645.00,
      unrealizedPL: 132.50,
      unrealizedPLPercentage: 3.77
    }
  ]
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    symbol: 'AAPL',
    quantity: 10,
    price: 192.30,
    amount: 1923.00,
    fees: 2.95,
    status: 'completed',
    timestamp: '2024-12-29T10:30:00Z',
    description: 'Bought 10 shares of AAPL'
  },
  {
    id: '2',
    type: 'deposit',
    amount: 5000.00,
    fees: 0,
    status: 'completed',
    timestamp: '2024-12-28T14:15:00Z',
    description: 'Deposit from bank account'
  }
];

const mockLinkedAccounts: LinkedAccount[] = [
  {
    id: '1',
    type: 'brokerage',
    name: 'TD Ameritrade',
    provider: 'tdameritrade',
    status: 'connected',
    balance: 25000.00,
    lastSync: '2024-12-29T12:00:00Z'
  },
  {
    id: '2',
    type: 'crypto',
    name: 'Coinbase Pro',
    provider: 'coinbase',
    status: 'connected',
    balance: 15000.00,
    lastSync: '2024-12-29T11:45:00Z'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [portfolio, setPortfolio] = useState<Portfolio>(mockPortfolio);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [linkedAccounts] = useState<LinkedAccount[]>(mockLinkedAccounts);

  const updatePortfolio = (newPortfolio: Portfolio) => {
    setPortfolio(newPortfolio);
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      portfolio,
      transactions,
      linkedAccounts,
      updatePortfolio,
      addTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}