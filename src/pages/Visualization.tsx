
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertTriangle, TrendingUp, Clock, RefreshCw, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Visualization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  const chartData = [
    { name: '00:00', volume: 120, alerts: 2 },
    { name: '04:00', volume: 80, alerts: 1 },
    { name: '08:00', volume: 250, alerts: 5 },
    { name: '12:00', volume: 400, alerts: 8 },
    { name: '16:00', volume: 600, alerts: 12 },
    { name: '20:00', volume: 350, alerts: 7 },
  ];

  const recentTransactions = [
    { hash: '0x1234...abcd', time: '2 min ago', amount: '125.5 ETH', risk: 'low', from: '0xabc...123', to: '0xdef...456' },
    { hash: '0x5678...efgh', time: '5 min ago', amount: '45.2 ETH', risk: 'medium', from: '0x789...xyz', to: '0x456...789' },
    { hash: '0x9abc...ijkl', time: '8 min ago', amount: '1250.0 ETH', risk: 'high', from: '0x111...222', to: '0x333...444' },
    { hash: '0xdef0...mnop', time: '12 min ago', amount: '78.9 ETH', risk: 'low', from: '0x555...666', to: '0x777...888' },
  ];

  const suspiciousWallets = [
    { address: '0x1234...5678', reason: 'Unusual volume spike (+2000% in 1h)', severity: 'high', timestamp: '5 min ago' },
    { address: '0xabcd...ef12', reason: 'Multiple small transactions (>100 tx)', severity: 'medium', timestamp: '12 min ago' },
    { address: '0x9876...4321', reason: 'New wallet with high activity', severity: 'medium', timestamp: '25 min ago' },
    { address: '0x5555...7777', reason: 'Interaction with known scam contracts', severity: 'high', timestamp: '1 hour ago' },
  ];

  const heatmapData = [
    { hour: '00-04', activity: 20, color: 'bg-blue-500' },
    { hour: '04-08', activity: 15, color: 'bg-blue-400' },
    { hour: '08-12', activity: 45, color: 'bg-yellow-500' },
    { hour: '12-16', activity: 80, color: 'bg-orange-500' },
    { hour: '16-20', activity: 95, color: 'bg-red-500' },
    { hour: '20-24', activity: 60, color: 'bg-orange-400' },
  ];

  const chartConfig = {
    volume: {
      label: "Volume",
      color: "hsl(var(--chart-1))",
    },
    alerts: {
      label: "Alerts",
      color: "hsl(var(--chart-2))",
    },
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdate(new Date());
    }, 2000);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityVariant = (severity) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Real-time Monitoring</h1>
            <p className="text-gray-400">Live transaction analysis and risk detection</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={isLoading}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enhanced Volume Chart */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Transaction Volume & Alerts (24h)
              </CardTitle>
              <CardDescription className="text-gray-400">
                Hourly volume and security alerts across monitored addresses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      name="Volume"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="alerts" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                      name="Alerts"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Enhanced Activity Heatmap */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Activity Heatmap
              </CardTitle>
              <CardDescription className="text-gray-400">
                Transaction activity intensity by time periods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {heatmapData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span className="text-gray-300 w-16 text-sm font-mono">{item.hour}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-8 relative overflow-hidden">
                      <div 
                        className={`h-full ${item.color} transition-all duration-500 flex items-center justify-center`}
                        style={{ width: `${item.activity}%` }}
                      >
                        {item.activity > 30 && (
                          <span className="text-white text-xs font-bold">{item.activity}%</span>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-300 w-12 text-sm">{item.activity}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enhanced Recent Transactions */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Live Transaction Feed</CardTitle>
              <CardDescription className="text-gray-400">
                Real-time transaction monitoring with risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx, index) => (
                  <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-blue-400 font-mono text-sm">{tx.hash}</span>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getRiskColor(tx.risk)} text-white`}>
                          {tx.risk}
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">From:</span>
                        <span className="text-gray-300 font-mono ml-2">{tx.from}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">To:</span>
                        <span className="text-gray-300 font-mono ml-2">{tx.to}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="text-gray-400">{tx.time}</span>
                      <span className="text-white font-medium">{tx.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Suspicious Activity Alerts */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                Security Alerts
                <Badge variant="destructive" className="ml-2">
                  {suspiciousWallets.length}
                </Badge>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time alerts for suspicious wallet behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suspiciousWallets.map((wallet, index) => (
                  <div key={index} className="p-4 bg-red-900/20 rounded-lg border border-red-700 hover:bg-red-900/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-300 font-mono text-sm">{wallet.address}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityVariant(wallet.severity)}>
                          {wallet.severity}
                        </Badge>
                        <span className="text-xs text-gray-400">{wallet.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{wallet.reason}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                        Investigate
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        Mark Safe
                      </Button>
                    </div>
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
