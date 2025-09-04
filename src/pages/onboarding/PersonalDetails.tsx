import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { TrendingUp, ArrowRight, ArrowLeft } from 'lucide-react';

interface PersonalDetailsForm {
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  zipCode: string;
}

export function PersonalDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalDetailsForm>();

  const onSubmit = async (data: PersonalDetailsForm) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Personal details:', data);
    navigate('/onboarding/kyc');
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
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-semibold">
                1
              </div>
              <div className="w-16 h-1 bg-gray-300 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm font-semibold">
                2
              </div>
              <div className="w-16 h-1 bg-gray-300 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm font-semibold">
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
            <CardTitle>Personal Information</CardTitle>
            <p className="text-gray-600">Please provide your personal details to continue with your account setup.</p>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                {...register('firstName', { required: 'First name is required' })}
                error={errors.firstName?.message}
                placeholder="John"
              />
              <Input
                label="Last Name"
                {...register('lastName', { required: 'Last name is required' })}
                error={errors.lastName?.message}
                placeholder="Doe"
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
              placeholder="john.doe@example.com"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  {...register('country', { required: 'Country is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="IN">India</option>
                </select>
                {errors.country && (
                  <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>
                )}
              </div>
              
              <Input
                label="Phone Number"
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
                error={errors.phone?.message}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <Input
              label="Date of Birth"
              type="date"
              {...register('dateOfBirth', { required: 'Date of birth is required' })}
              error={errors.dateOfBirth?.message}
            />

            <Input
              label="Address"
              {...register('address', { required: 'Address is required' })}
              error={errors.address?.message}
              placeholder="123 Main Street"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="City"
                {...register('city', { required: 'City is required' })}
                error={errors.city?.message}
                placeholder="New York"
              />
              <Input
                label="ZIP Code"
                {...register('zipCode', { required: 'ZIP code is required' })}
                error={errors.zipCode?.message}
                placeholder="10001"
              />
            </div>

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/signup')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                loading={isLoading}
              >
                Continue to KYC
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}