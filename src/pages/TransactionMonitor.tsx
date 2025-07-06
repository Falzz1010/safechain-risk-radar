
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp } from 'lucide-react';

const TransactionMonitor = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 lg:px-6 pt-8 pb-12">
          <div className="space-y-2 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  Transaction Monitor
                </h1>
                <p className="text-gray-400 text-sm lg:text-base">
                  Monitor and analyze blockchain transactions
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Transaction Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Real-time transaction monitoring and pattern detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Transaction monitoring active</p>
                <p className="text-gray-500 text-sm mt-2">Analyzing blockchain activity</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionMonitor;
