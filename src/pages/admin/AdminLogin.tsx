import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { TrendingUp, Shield } from 'lucide-react';

interface AdminLoginForm {
  email: string;
  password: string;
}

export function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setError } = useForm<AdminLoginForm>();

  const onSubmit = async (data: AdminLoginForm) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/admin');
    } catch (error) {
      setError('email', { message: 'Invalid admin credentials' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center space-x-2 mb-6">
          <TrendingUp className="h-10 w-10 text-blue-400" />
          <span className="text-2xl font-bold text-white">Bons-AI</span>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Admin Access
          </h2>
          <p className="text-gray-400">
            Restricted area - Authorized personnel only
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Administrator Login</CardTitle>
            <p className="text-gray-600">Enter your admin credentials to access the control panel.</p>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Admin Email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
              placeholder="admin@bons-ai.com"
            />

            <Input
              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
              placeholder="Enter your password"
            />

            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
            >
              <Shield className="w-4 h-4 mr-2" />
              Access Admin Panel
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Demo Credentials:<br />
              Email: admin@bons-ai.com<br />
              Password: password123
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}