export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  country: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  riskProfile: RiskProfile;
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  createdAt: string;
  lastLogin: string;
}

export interface RiskProfile {
  investmentGoals: string;
  timeHorizon: string;
  riskTolerance: 'low' | 'medium' | 'high';
  experience: string;
  score: number;
}

export interface Portfolio {
  totalValue: number;
  availableFunds: number;
  turingTokens: number;
  totalReturns: number;
  returnPercentage: number;
  positions: Position[];
}

export interface Position {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPL: number;
  unrealizedPLPercentage: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdrawal';
  symbol?: string;
  quantity?: number;
  price?: number;
  amount: number;
  fees: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  description: string;
}

export interface LinkedAccount {
  id: string;
  type: 'brokerage' | 'crypto';
  name: string;
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
  balance: number;
  lastSync: string;
}