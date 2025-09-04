import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { TrendingUp, BarChart3, ArrowRight, ArrowLeft } from 'lucide-react';

interface RiskForm {
  investmentGoals: string;
  timeHorizon: string;
  riskTolerance: string;
  experience: string;
  investmentAmount: string;
  volatilityComfort: string;
}

export function RiskProfiling() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RiskForm>();

  const watchedValues = watch();

  const calculateRiskScore = () => {
    let score = 0;
    
    // Investment goals
    switch (watchedValues.investmentGoals) {
      case 'preservation': score += 1; break;
      case 'income': score += 2; break;
      case 'balanced': score += 3; break;
      case 'growth': score += 4; break;
      case 'aggressive': score += 5; break;
    }
    
    // Time horizon
    switch (watchedValues.timeHorizon) {
      case 'short': score += 1; break;
      case 'medium': score += 3; break;
      case 'long': score += 5; break;
    }
    
    // Risk tolerance
    switch (watchedValues.riskTolerance) {
      case 'low': score += 1; break;
      case 'medium': score += 3; break;
      case 'high': score += 5; break;
    }
    
    return Math.min(score, 10);
  };

  const riskScore = calculateRiskScore();

  const onSubmit = async (data: RiskForm) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Risk profile:', { ...data, score: riskScore });
    navigate('/onboarding/success');
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
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-semibold">
                ✓
              </div>
              <div className="w-16 h-1 bg-green-600 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-semibold">
                ✓
              </div>
              <div className="w-16 h-1 bg-green-600 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-semibold">
                5
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Investment Risk Profile</CardTitle>
            <p className="text-gray-600">
              Help us understand your investment goals and risk tolerance to provide personalized recommendations.
            </p>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What are your primary investment goals?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'preservation', label: 'Capital Preservation - Protect my money from loss' },
                  { value: 'income', label: 'Income Generation - Generate regular income' },
                  { value: 'balanced', label: 'Balanced Growth - Mix of growth and income' },
                  { value: 'growth', label: 'Long-term Growth - Grow wealth over time' },
                  { value: 'aggressive', label: 'Aggressive Growth - Maximum growth potential' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      {...register('investmentGoals', { required: 'Please select your investment goals' })}
                      value={option.value}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.investmentGoals && (
                <p className="text-sm text-red-600 mt-1">{errors.investmentGoals.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What is your investment time horizon?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'short', label: 'Short-term (Less than 3 years)' },
                  { value: 'medium', label: 'Medium-term (3-10 years)' },
                  { value: 'long', label: 'Long-term (More than 10 years)' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      {...register('timeHorizon', { required: 'Please select your time horizon' })}
                      value={option.value}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.timeHorizon && (
                <p className="text-sm text-red-600 mt-1">{errors.timeHorizon.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you describe your risk tolerance?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'low', label: 'Conservative - I prefer stable, low-risk investments' },
                  { value: 'medium', label: 'Moderate - I can accept some risk for potential returns' },
                  { value: 'high', label: 'Aggressive - I\'m comfortable with high risk for high returns' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      {...register('riskTolerance', { required: 'Please select your risk tolerance' })}
                      value={option.value}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.riskTolerance && (
                <p className="text-sm text-red-600 mt-1">{errors.riskTolerance.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What is your investment experience?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'beginner', label: 'Beginner - New to investing' },
                  { value: 'intermediate', label: 'Intermediate - Some investment experience' },
                  { value: 'advanced', label: 'Advanced - Extensive investment experience' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      {...register('experience', { required: 'Please select your experience level' })}
                      value={option.value}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.experience && (
                <p className="text-sm text-red-600 mt-1">{errors.experience.message}</p>
              )}
            </div>

            {riskScore > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <div className="flex items-center">
                  <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-blue-900">
                      Your Risk Score: {riskScore}/10
                    </p>
                    <p className="text-sm text-blue-700">
                      {riskScore <= 3 && 'Conservative investor - Focus on capital preservation'}
                      {riskScore > 3 && riskScore <= 6 && 'Moderate investor - Balanced approach to risk and return'}
                      {riskScore > 6 && 'Aggressive investor - Willing to take higher risks for potential returns'}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/onboarding/contract')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                loading={isLoading}
              >
                Complete Setup
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}