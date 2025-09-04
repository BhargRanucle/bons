import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { TrendingUp, CheckCircle, ArrowRight, DollarSign, BarChart3 } from 'lucide-react';

export function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Bons-AI</span>
          </div>
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-semibold">
                ✓
              </div>
              <div className="w-16 h-1 bg-green-600 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-semibold">
                ✓
              </div>
              <div className="w-16 h-1 bg-green-600 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-semibold">
                ✓
              </div>
              <div className="w-16 h-1 bg-green-600 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-semibold">
                ✓
              </div>
              <div className="w-16 h-1 bg-green-600 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-semibold">
                ✓
              </div>
            </div>
          </div>
        </div>

        <Card className="text-center">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <CardTitle className="text-2xl mb-4">
              Welcome to Bons-AI!
            </CardTitle>
            
            <p className="text-gray-600 mb-8 text-lg">
              Your account has been successfully created and your 30-day free trial has started. 
              You're now ready to experience AI-powered trading.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-green-50 border-green-200 text-center p-4">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-green-800">Account Verified</p>
                <p className="text-sm text-green-600">KYC approved</p>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200 text-center p-4">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-blue-800">Free Trial Active</p>
                <p className="text-sm text-blue-600">30 days remaining</p>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200 text-center p-4">
                <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-purple-800">AI Models Ready</p>
                <p className="text-sm text-purple-600">Personalized for you</p>
              </Card>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate('/funding')}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Add Funds to Start Trading
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => navigate('/dashboard')}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Explore Dashboard
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need help getting started?{' '}
                <button className="text-blue-600 hover:text-blue-500">
                  Contact our support team
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}