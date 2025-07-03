
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wallet, Search, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Analyzer = () => {
  const [address, setAddress] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    if (!address.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setResults({
        totalTx: 1247,
        walletAge: 156,
        reputationScore: 73,
        riskTags: [
          { label: 'Verified Project', type: 'safe' },
          { label: 'High Volume', type: 'warning' },
          { label: 'Multiple DEX', type: 'info' }
        ],
        tokenInfo: {
          isHoneypot: false,
          rugPullRisk: 'Low',
          liquidityLocked: true
        }
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const getTagColor = (type) => {
    switch (type) {
      case 'safe': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'danger': return 'bg-red-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Wallet Risk Analyzer</h1>
          <p className="text-gray-400">Enter wallet address or token contract to analyze risk</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Input Section */}
          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wallet className="mr-2 h-5 w-5" />
                Address Input
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enter wallet address or token contract (0x...)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="0x1234567890abcdef..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-gray-900 border-gray-600 text-gray-100"
                />
                <Button 
                  onClick={handleAnalyze}
                  disabled={!address.trim() || isAnalyzing}
                  className="bg-purple-600 hover:bg-purple-700 px-8"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wallet Stats */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Wallet Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Transactions</span>
                    <span className="text-white font-bold">{results.totalTx.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Wallet Age</span>
                    <span className="text-white font-bold">{results.walletAge} days</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Reputation Score</span>
                      <span className="text-white font-bold">{results.reputationScore}/100</span>
                    </div>
                    <Progress value={results.reputationScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Risk Tags */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.riskTags.map((tag, index) => (
                      <Badge key={index} className={`${getTagColor(tag.type)} text-white`}>
                        {tag.label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Token Information */}
              <Card className="bg-gray-800/50 border-gray-700 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Token Security Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3">
                      {results.tokenInfo.isHoneypot ? (
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      ) : (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      )}
                      <div>
                        <p className="text-white font-medium">Honeypot Check</p>
                        <p className="text-sm text-gray-400">
                          {results.tokenInfo.isHoneypot ? 'Detected' : 'Clear'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`h-6 w-6 rounded-full ${
                        results.tokenInfo.rugPullRisk === 'Low' ? 'bg-green-500' : 
                        results.tokenInfo.rugPullRisk === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="text-white font-medium">Rug Pull Risk</p>
                        <p className="text-sm text-gray-400">{results.tokenInfo.rugPullRisk}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {results.tokenInfo.liquidityLocked ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      )}
                      <div>
                        <p className="text-white font-medium">Liquidity</p>
                        <p className="text-sm text-gray-400">
                          {results.tokenInfo.liquidityLocked ? 'Locked' : 'Unlocked'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!results && !isAnalyzing && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="text-center text-gray-400">
                  <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Enter an address and click "Analyze" to see risk assessment</p>
                </div>
              </CardContent>
            </Card>
          )}

          {isAnalyzing && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="text-center text-gray-400">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
                  <p>Analyzing wallet and transaction patterns...</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
