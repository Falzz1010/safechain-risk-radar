
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Visualization = () => {
  const chartData = [
    { name: '00:00', volume: 120 },
    { name: '04:00', volume: 80 },
    { name: '08:00', volume: 250 },
    { name: '12:00', volume: 400 },
    { name: '16:00', volume: 600 },
    { name: '20:00', volume: 350 },
  ];

  const recentTransactions = [
    { hash: '0x1234...abcd', time: '2 min ago', amount: '125.5 ETH', risk: 'low' },
    { hash: '0x5678...efgh', time: '5 min ago', amount: '45.2 ETH', risk: 'medium' },
    { hash: '0x9abc...ijkl', time: '8 min ago', amount: '1250.0 ETH', risk: 'high' },
    { hash: '0xdef0...mnop', time: '12 min ago', amount: '78.9 ETH', risk: 'low' },
  ];

  const suspiciousWallets = [
    { address: '0x1234...5678', reason: 'Unusual volume spike', severity: 'high' },
    { address: '0xabcd...ef12', reason: 'Multiple small transactions', severity: 'medium' },
    { address: '0x9876...4321', reason: 'New wallet high activity', severity: 'medium' },
  ];

  const heatmapData = [
    { hour: '00-04', activity: 20 },
    { hour: '04-08', activity: 15 },
    { hour: '08-12', activity: 45 },
    { hour: '12-16', activity: 80 },
    { hour: '16-20', activity: 95 },
    { hour: '20-24', activity: 60 },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getActivityColor = (activity) => {
    if (activity > 80) return 'bg-red-500';
    if (activity > 50) return 'bg-yellow-500';
    if (activity > 20) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Transaction Visualization</h1>
          <p className="text-gray-400">Real-time monitoring and analysis dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Volume Chart */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Transaction Volume (24h)
              </CardTitle>
              <CardDescription className="text-gray-400">
                Hourly transaction volume across monitored addresses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Activity Heatmap */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Activity Heatmap
              </CardTitle>
              <CardDescription className="text-gray-400">
                Transaction activity by time periods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {heatmapData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span className="text-gray-300 w-16 text-sm">{item.hour}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className={`h-full ${getActivityColor(item.activity)} transition-all duration-500`}
                        style={{ width: `${item.activity}%` }}
                      />
                    </div>
                    <span className="text-gray-300 w-12 text-sm">{item.activity}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <CardDescription className="text-gray-400">
                Latest transaction activity timeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx, index) => (
                  <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 font-mono text-sm">{tx.hash}</span>
                      <Badge className={`${getRiskColor(tx.risk)} text-white`}>
                        {tx.risk}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">{tx.time}</span>
                      <span className="text-white font-medium">{tx.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suspicious Wallets Alert */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                Suspicious Activity Alerts
              </CardTitle>
              <CardDescription className="text-gray-400">
                Wallets flagged for unusual behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suspiciousWallets.map((wallet, index) => (
                  <div key={index} className="p-4 bg-red-900/20 rounded-lg border border-red-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-300 font-mono text-sm">{wallet.address}</span>
                      <Badge variant={wallet.severity === 'high' ? 'destructive' : 'secondary'}>
                        {wallet.severity}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{wallet.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
