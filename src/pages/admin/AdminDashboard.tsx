import React from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { 
  Users, 
  DollarSign, 
  FileText, 
  Shield, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1450 },
  { month: 'Mar', users: 1680 },
  { month: 'Apr', users: 1920 },
  { month: 'May', users: 2150 },
  { month: 'Jun', users: 2480 }
];

const kycStatusData = [
  { name: 'Verified', value: 78, color: '#10B981' },
  { name: 'Pending', value: 15, color: '#F59E0B' },
  { name: 'Rejected', value: 7, color: '#EF4444' }
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of platform metrics and user management.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">2,480</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15.2% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total AUM</p>
                <p className="text-2xl font-bold text-gray-900">$2.5B</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8.7% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">KYC Pending</p>
                <p className="text-2xl font-bold text-orange-600">127</p>
                <p className="text-sm text-gray-500 mt-1">Awaiting review</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$487K</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.3% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* KYC Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>KYC Status Distribution</CardTitle>
            </CardHeader>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={kycStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {kycStatusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {kycStatusData.map((item) => (
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

        {/* Recent Activity & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent KYC Submissions</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              {[
                { name: 'Sarah Johnson', email: 'sarah.j@email.com', status: 'pending', time: '2 hours ago' },
                { name: 'Mike Chen', email: 'mike.chen@email.com', status: 'verified', time: '4 hours ago' },
                { name: 'Emma Wilson', email: 'emma.w@email.com', status: 'pending', time: '6 hours ago' },
                { name: 'David Brown', email: 'david.b@email.com', status: 'rejected', time: '1 day ago' }
              ].map((submission, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      submission.status === 'verified' ? 'bg-green-100' : 
                      submission.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      {submission.status === 'verified' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : submission.status === 'pending' ? (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{submission.name}</p>
                      <p className="text-sm text-gray-500">{submission.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium capitalize ${
                      submission.status === 'verified' ? 'text-green-600' : 
                      submission.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {submission.status}
                    </p>
                    <p className="text-sm text-gray-500">{submission.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium text-red-900">
                    High API Usage Detected
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    TD Ameritrade API calls approaching rate limit threshold.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <Clock className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">
                    Scheduled Maintenance
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    System maintenance scheduled for Dec 31, 2024 at 2:00 AM UTC.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    AI Model Update Completed
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Version 2.1.3 of the trading algorithm has been deployed successfully.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}