import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { TrendingUp, CreditCard, Building2, ArrowRight, ArrowLeft, Shield } from 'lucide-react';

interface PaymentForm {
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
  bankName: string;
}

export function Payment() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentForm>();

  const onSubmit = async (data: PaymentForm) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Payment details:', data);
    navigate('/onboarding/contract');
    setIsLoading(false);
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
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-semibold">
                3
              </div>
              <div className="w-16 h-1 bg-gray-300 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm font-semibold">
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
            <CardTitle>Payment Setup</CardTitle>
            <p className="text-gray-600">
              Set up your bank account for funding your trading account. Your free trial starts immediately.
            </p>
          </CardHeader>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm text-blue-800 font-medium">
                Your banking information is encrypted and secured with 256-bit SSL
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Bank Name"
              {...register('bankName', { required: 'Bank name is required' })}
              error={errors.bankName?.message}
              placeholder="Wells Fargo"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Account Number"
                {...register('accountNumber', { 
                  required: 'Account number is required',
                  minLength: {
                    value: 8,
                    message: 'Account number must be at least 8 digits'
                  }
                })}
                error={errors.accountNumber?.message}
                placeholder="123456789"
              />
              <Input
                label="Routing Number"
                {...register('routingNumber', { 
                  required: 'Routing number is required',
                  pattern: {
                    value: /^\d{9}$/,
                    message: 'Routing number must be 9 digits'
                  }
                })}
                error={errors.routingNumber?.message}
                placeholder="021000021"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative">
                  <input
                    type="radio"
                    {...register('accountType', { required: 'Account type is required' })}
                    value="checking"
                    className="sr-only"
                  />
                  <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 peer-checked:border-blue-500 peer-checked:bg-blue-50">
                    <div className="flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-gray-600 mr-2" />
                      <span className="font-medium">Checking</span>
                    </div>
                  </div>
                </label>
                <label className="relative">
                  <input
                    type="radio"
                    {...register('accountType', { required: 'Account type is required' })}
                    value="savings"
                    className="sr-only"
                  />
                  <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 peer-checked:border-blue-500 peer-checked:bg-blue-50">
                    <div className="flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-gray-600 mr-2" />
                      <span className="font-medium">Savings</span>
                    </div>
                  </div>
                </label>
              </div>
              {errors.accountType && (
                <p className="text-sm text-red-600 mt-1">{errors.accountType.message}</p>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Free Trial Included
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      • 30-day free trial with full platform access<br/>
                      • No charges until trial expires<br/>
                      • Cancel anytime during trial period
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/onboarding/kyc')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                loading={isLoading}
              >
                Continue to Contract
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}