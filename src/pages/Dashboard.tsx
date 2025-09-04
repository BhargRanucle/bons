import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PlusCircle, 
  BarChart3, 
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const performanceData = [
  { date: '2024-01', value: 100000 },
  { date: '2024-02', value: 105000 },
  { date: '2024-03', value: 102000 },
  { date: '2024-04', value: 110000 },
  { date: '2024-05', value: 108000 },
  { date: '2024-06', value: 115000 },
  { date: '2024-07', value: 118000 },
  { date: '2024-08', value: 112000 },
  { date: '2024-09', value: 120000 },
  { date: '2024-10', value: 123000 },
  { date: '2024-11', value: 125000 },
  { date: '2024-12', value: 125750 }
];

const allocationData = [
  { name: 'Stocks', value: 60, color: '#3B82F6' },
  { name: 'Bonds', value: 25, color: '#10B981' },
  { name: 'Cash', value: 10, color: '#F59E0B' },
  { name: 'Alternatives', value: 5, color: '#8B5CF6' }
];

export function Dashboard() {
  const { portfolio, transactions } = useApp();

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your portfolio overview.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Portfolio</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${portfolio.totalValue.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +${portfolio.totalReturns.toLocaleString()} ({portfolio.returnPercentage}%)
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Funds</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${portfolio.availableFunds.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">Ready to invest</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Turing Tokens</p>
                <p className="text-2xl font-bold text-gray-900">
                  {portfolio.turingTokens.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">BSAI tokens</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Day's Change</p>
                <p className="text-2xl font-bold text-green-600">+$1,247.50</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+1.02%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Portfolio Performance Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Asset Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              <Link to="/funding" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Funds
                </Button>
              </Link>
              <Link to="/funding" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="h-4 w-4 mr-2" />
                  Link Account
                </Button>
              </Link>
              <Link to="/transactions" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Transactions
                </Button>
              </Link>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Activity</CardTitle>
                <Link to="/transactions">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      transaction.type === 'buy' ? 'bg-green-100' : 
                      transaction.type === 'sell' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {transaction.type === 'buy' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : transaction.type === 'sell' ? (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      ) : (
                        <DollarSign className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'deposit' || transaction.type === 'buy' 
                        ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' || transaction.type === 'buy' ? '+' : '-'}
                      ${transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-blue-600 mr-2" />
              <CardTitle>Alerts & Notifications</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-900">
                  AI Recommendation: Consider increasing AAPL position
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Our AI models detect a strong buy signal for Apple Inc. based on recent market data.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex-shrink-0">
                <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-900">
                  Monthly dividend payment received: $127.50
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Dividend from your equity positions has been deposited to your account.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}