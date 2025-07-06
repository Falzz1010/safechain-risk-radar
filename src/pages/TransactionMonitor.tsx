
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity, TrendingUp, TrendingDown, Clock, Search, Filter, ExternalLink, Copy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  riskLevel: 'low' | 'medium' | 'high';
  type: 'transfer' | 'contract_interaction' | 'token_transfer' | 'swap';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    from: '0x742d35Cc1F1C7A1C7F7C0c8F8C8F8C8F8C8F8C8F',
    to: '0x8C8F8C8F8C8F8C8F8C8F8C8F8C8F8C8F8C8F8C8F',
    value: '1.5',
    gasUsed: '21000',
    gasPrice: '20',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'success',
    riskLevel: 'low',
    type: 'transfer'
  },
  {
    id: '2',
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    from: '0x9876543210fedcba9876543210fedcba98765432',
    to: '0x1111111111111111111111111111111111111111',
    value: '100.0',
    gasUsed: '65000',
    gasPrice: '25',
    timestamp: '2024-01-15T10:25:00Z',
    status: 'success',
    riskLevel: 'high',
    type: 'contract_interaction'
  },
  {
    id: '3',
    hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
    from: '0x2222222222222222222222222222222222222222',
    to: '0x3333333333333333333333333333333333333333',
    value: '0.1',
    gasUsed: '35000',
    gasPrice: '18',
    timestamp: '2024-01-15T10:20:00Z',
    status: 'failed',
    riskLevel: 'medium',
    type: 'token_transfer'
  }
];

export default function TransactionMonitor() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const { toast } = useToast();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500/20 text-green-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "✅ Copied",
      description: "Address copied to clipboard",
    });
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || tx.riskLevel === filterRisk;
    const matchesType = filterType === 'all' || tx.type === filterType;
    
    return matchesSearch && matchesRisk && matchesType;
  });

  const totalValue = transactions.reduce((sum, tx) => sum + parseFloat(tx.value), 0);
  const highRiskCount = transactions.filter(tx => tx.riskLevel === 'high').length;
  const successRate = (transactions.filter(tx => tx.status === 'success').length / transactions.length * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-6 pt-20 sm:pt-24 pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white">Transaction Monitor</h1>
                <p className="text-gray-400">Real-time blockchain transaction monitoring and analysis</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <ExternalLink className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Transactions</p>
                  <p className="text-2xl font-bold text-white">{transactions.length}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Value</p>
                  <p className="text-2xl font-bold text-green-400">{totalValue.toFixed(2)} ETH</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">High Risk</p>
                  <p className="text-2xl font-bold text-red-400">{highRiskCount}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Success Rate</p>
                  <p className="text-2xl font-bold text-blue-400">{successRate}%</p>
                </div>
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by hash, from, or to address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-600 text-gray-100"
                />
              </div>
              
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-gray-100"
              >
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-gray-100"
              >
                <option value="all">All Types</option>
                <option value="transfer">Transfer</option>
                <option value="contract_interaction">Contract</option>
                <option value="token_transfer">Token</option>
                <option value="swap">Swap</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <Card key={tx.id} className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/60 transition-all duration-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <code className="text-sm bg-gray-900/50 px-2 py-1 rounded text-blue-400 font-mono">
                          {tx.hash.substring(0, 20)}...
                        </code>
                        <Badge className={getRiskColor(tx.riskLevel)}>
                          {tx.riskLevel.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(tx.status)}>
                          {tx.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-gray-300">
                          {tx.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">From:</span>
                            <code className="text-blue-400 font-mono">{tx.from.substring(0, 10)}...</code>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => copyToClipboard(tx.from)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-300"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">To:</span>
                            <code className="text-blue-400 font-mono">{tx.to.substring(0, 10)}...</code>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => copyToClipboard(tx.to)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-300"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Value:</span>
                            <span className="text-green-400 font-medium">{tx.value} ETH</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Gas:</span>
                            <span className="text-gray-300">{tx.gasUsed} @ {tx.gasPrice} gwei</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{new Date(tx.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredTransactions.length === 0 && (
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-12 text-center">
              <Activity className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No transactions found</h3>
              <p className="text-gray-500">No transactions match your current filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
