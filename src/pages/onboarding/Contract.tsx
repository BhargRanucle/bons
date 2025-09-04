import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { TrendingUp, FileText, CheckSquare, ArrowRight, ArrowLeft } from 'lucide-react';

export function Contract() {
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSign = async () => {
    if (agreed) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/onboarding/risk-profiling');
      setIsLoading(false);
    }
  };

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
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-semibold">
                4
              </div>
              <div className="w-16 h-1 bg-gray-300 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm font-semibold">
                5
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Service Agreement</CardTitle>
            <p className="text-gray-600">
              Please review and sign the service agreement to continue setting up your account.
            </p>
          </CardHeader>

          <div className="space-y-6">
            <div className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold">Bons-AI Service Agreement</span>
              </div>
              
              <div className="prose text-sm text-gray-700 space-y-4">
                <h3 className="font-semibold">1. Service Description</h3>
                <p>
                  Bons-AI provides AI-powered trading analytics, portfolio management tools, and automated trading strategies 
                  to help you make informed investment decisions.
                </p>
                
                <h3 className="font-semibold">2. Account Terms</h3>
                <p>
                  Your account allows you to access our platform, execute trades, and utilize our AI-powered tools. 
                  You are responsible for maintaining the security of your account credentials.
                </p>
                
                <h3 className="font-semibold">3. Investment Risks</h3>
                <p>
                  All investments carry risk, including the potential loss of principal. Past performance does not 
                  guarantee future results. You acknowledge that you understand these risks.
                </p>
                
                <h3 className="font-semibold">4. Fees and Charges</h3>
                <p>
                  Our fee structure is clearly outlined in your subscription plan. Additional fees may apply for 
                  certain premium services or high-frequency trading.
                </p>
                
                <h3 className="font-semibold">5. Data Usage</h3>
                <p>
                  We collect and analyze your trading data to improve our AI models and provide personalized 
                  recommendations. Your data is encrypted and never shared with third parties.
                </p>
                
                <h3 className="font-semibold">6. Termination</h3>
                <p>
                  Either party may terminate this agreement with 30 days written notice. Upon termination, 
                  you retain access to withdraw your funds and download your trading history.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckSquare className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800 mb-1">
                    Digital Signature Placeholder
                  </h3>
                  <p className="text-sm text-blue-700">
                    In production, this would integrate with DocuSign or similar e-signature service
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agree" className="ml-3 block text-sm text-gray-900">
                I have read, understood, and agree to the terms and conditions of this Service Agreement
              </label>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/onboarding/payment')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleSign}
                disabled={!agreed}
                loading={isLoading}
              >
                Sign Agreement
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}