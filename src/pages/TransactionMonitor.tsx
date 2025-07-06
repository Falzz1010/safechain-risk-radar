
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, RefreshCw, Eye, TrendingUp, Hash, Clock } from 'lucide-react';
import { useSecurityData } from '@/hooks/useSecurityData';

const TransactionMonitor = () => {
  const { transactions, loading, error, refresh } = useSecurityData();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                <Activity className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                  Transaction Monitor
                </h1>
                <p className="text-gray-400 text-sm md:text-base">
                  Monitor and analyze blockchain transactions
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4 md:p-6">
              <div className="text-center py-8 md:py-12">
                <Activity className="h-12 w-12 md:h-16 md:w-16 text-red-500 mx-auto mb-4" />
                <p className="text-red-400 text-lg">Error loading transaction data</p>
                <p className="text-gray-500 text-sm mt-2">{error}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
              <Activity className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                Transaction Monitor
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Real-time blockchain transaction analysis
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size="sm"
            disabled={loading || refreshing}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 self-start sm:self-auto"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${(loading || refreshing) ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4 md:p-6">
              <div className="text-center py-8 md:py-12">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">Loading transaction data...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-gray-400 text-sm">Total Transactions</span>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold mt-2">{transactions.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-red-400" />
                    <span className="text-gray-400 text-sm">High Risk</span>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold mt-2">
                    {transactions.filter(tx => tx.riskLevel === 'high').length}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-400 text-sm">Medium Risk</span>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold mt-2">
                    {transactions.filter(tx => tx.riskLevel === 'medium').length}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-400 text-sm">Last Block</span>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold mt-2">
                    {Math.max(...transactions.map(tx => tx.blockNumber)).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Transaction List */}
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-white">Live Transaction Feed</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time transaction monitoring with risk assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-3 md:p-4 bg-gray-900/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <Hash className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        <span className="text-blue-400 font-mono text-xs md:text-sm truncate">{tx.hash}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`${getRiskColor(tx.riskLevel)} text-xs`}>
                          {tx.riskLevel.toUpperCase()}
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-6 px-2">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                      <div className="space-y-1">
                        <div>
                          <span className="text-gray-400">From: </span>
                          <span className="text-gray-300 font-mono break-all">{tx.from}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">To: </span>
                          <span className="text-gray-300 font-mono break-all">{tx.to}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div>
                          <span className="text-gray-400">Value: </span>
                          <span className="text-white font-medium">{tx.value}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Block: </span>
                          <span className="text-gray-300">{tx.blockNumber.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3 pt-3 border-t border-gray-700">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(tx.timestamp)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Gas Used: {parseInt(tx.gasUsed).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TransactionMonitor;
