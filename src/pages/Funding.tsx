import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { useApp } from '../contexts/AppContext';
import { 
  DollarSign, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Link as LinkIcon,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface TokenPurchaseForm {
  amount: number;
  paymentMethod: 'card' | 'bank' | 'paypal';
}

interface AccountLinkForm {
  apiKey: string;
  apiSecret: string;
  provider: string;
}

export function Funding() {
  const [activeTab, setActiveTab] = useState<'tokens' | 'accounts'>('tokens');
  const [isLoading, setIsLoading] = useState(false);
  const { linkedAccounts } = useApp();

  const { register: registerToken, handleSubmit: handleTokenSubmit } = useForm<TokenPurchaseForm>();
  const { register: registerAccount, handleSubmit: handleAccountSubmit } = useForm<AccountLinkForm>();

  const onTokenPurchase = async (data: TokenPurchaseForm) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Token purchase:', data);
    setIsLoading(false);
  };

  const onAccountLink = async (data: AccountLinkForm) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Account link:', data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Funding</h1>
          <p className="text-gray-600">Add funds to your account or link external trading accounts.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8">
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'tokens'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('tokens')}
          >
            <DollarSign className="h-4 w-4 inline mr-2" />
            Buy Turing Tokens
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'accounts'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('accounts')}
          >
            <LinkIcon className="h-4 w-4 inline mr-2" />
            Link Accounts
          </button>
        </div>

        {activeTab === 'tokens' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Token Purchase Form */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase Turing Tokens (BSAI)</CardTitle>
                <p className="text-gray-600">
                  Buy BSAI tokens to access premium AI trading features and strategies.
                </p>
              </CardHeader>

              <form onSubmit={handleTokenSubmit(onTokenPurchase)} className="space-y-6">
                <Input
                  label="Amount (USD)"
                  type="number"
                  step="0.01"
                  min="10"
                  {...registerToken('amount', { 
                    required: 'Amount is required',
                    min: { value: 10, message: 'Minimum amount is $10' }
                  })}
                  placeholder="100.00"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                      { value: 'bank', label: 'Bank Transfer', icon: Building2 },
                      { value: 'paypal', label: 'PayPal', icon: Smartphone }
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <label key={method.value} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            {...registerToken('paymentMethod', { required: 'Payment method is required' })}
                            value={method.value}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <Icon className="h-5 w-5 text-gray-600 ml-3 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{method.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <Button type="submit" className="w-full" loading={isLoading}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Purchase Tokens
                </Button>
              </form>
            </Card>

            {/* Token Info */}
            <Card>
              <CardHeader>
                <CardTitle>Token Information</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Price</span>
                  <span className="font-semibold">$1.00 USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Balance</span>
                  <span className="font-semibold">2,500 BSAI</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Minimum Purchase</span>
                  <span className="font-semibold">$10.00 USD</span>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h4 className="font-medium text-blue-900 mb-2">Token Benefits</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Access to premium AI strategies</li>
                    <li>• Lower trading fees</li>
                    <li>• Priority customer support</li>
                    <li>• Advanced analytics tools</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Add New Account */}
            <Card>
              <CardHeader>
                <CardTitle>Link New Trading Account</CardTitle>
                <p className="text-gray-600">
                  Connect your existing brokerage or crypto exchange accounts via API.
                </p>
              </CardHeader>

              <form onSubmit={handleAccountSubmit(onAccountLink)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Provider
                  </label>
                  <select
                    {...registerAccount('provider', { required: 'Provider is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a provider</option>
                    <option value="tdameritrade">TD Ameritrade</option>
                    <option value="schwab">Charles Schwab</option>
                    <option value="fidelity">Fidelity</option>
                    <option value="coinbase">Coinbase Pro</option>
                    <option value="binance">Binance</option>
                    <option value="kraken">Kraken</option>
                  </select>
                </div>

                <Input
                  label="API Key"
                  {...registerAccount('apiKey', { required: 'API key is required' })}
                  placeholder="Enter your API key"
                />

                <Input
                  label="API Secret"
                  type="password"
                  {...registerAccount('apiSecret', { required: 'API secret is required' })}
                  placeholder="Enter your API secret"
                />

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800 mb-1">Security Note</p>
                      <p className="text-yellow-700">
                        Ensure your API keys have read-only permissions. We never store trading permissions.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" loading={isLoading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Link Account
                </Button>
              </form>
            </Card>

            {/* Linked Accounts */}
            <Card>
              <CardHeader>
                <CardTitle>Linked Accounts</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {linkedAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        account.type === 'brokerage' ? 'bg-blue-100' : 'bg-orange-100'
                      }`}>
                        {account.type === 'brokerage' ? (
                          <Building2 className="h-5 w-5 text-blue-600" />
                        ) : (
                          <DollarSign className="h-5 w-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{account.name}</p>
                        <p className="text-sm text-gray-500">
                          Balance: ${account.balance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`flex items-center mr-4 ${
                        account.status === 'connected' ? 'text-green-600' : 
                        account.status === 'disconnected' ? 'text-gray-500' : 'text-red-600'
                      }`}>
                        {account.status === 'connected' ? (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        ) : account.status === 'disconnected' ? (
                          <Clock className="h-4 w-4 mr-1" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-sm font-medium capitalize">{account.status}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}