
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Wallet, Trash2, Eye, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [watchlistAddress, setWatchlistAddress] = useState('');

  const [auditHistory] = useState([
    { id: 1, contract: 'MyToken.sol', date: '2024-01-15', score: 'A', status: 'Safe' },
    { id: 2, contract: 'DEXRouter.sol', date: '2024-01-14', score: 'B', status: 'Warning' },
    { id: 3, contract: 'LendingPool.sol', date: '2024-01-13', score: 'C', status: 'Risk' },
  ]);

  const [watchlist, setWatchlist] = useState([
    { id: 1, address: '0x1234...5678', label: 'Suspicious Wallet', risk: 'High' },
    { id: 2, address: '0xabcd...ef12', label: 'DeFi Protocol', risk: 'Low' },
    { id: 3, address: '0x9876...4321', label: 'Token Contract', risk: 'Medium' },
  ]);

  const handleLogin = () => {
    if (email.trim()) {
      setIsLoggedIn(true);
    }
  };

  const handleWalletConnect = () => {
    setIsLoggedIn(true);
  };

  const addToWatchlist = () => {
    if (watchlistAddress.trim()) {
      const newItem = {
        id: Date.now(),
        address: watchlistAddress,
        label: 'New Address',
        risk: 'Unknown'
      };
      setWatchlist([...watchlist, newItem]);
      setWatchlistAddress('');
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  const getScoreColor = (score) => {
    switch (score) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-yellow-500';
      case 'C': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'secondary';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-md mx-auto">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">Login to Dashboard</CardTitle>
                <CardDescription className="text-gray-400">
                  Access your audit history and watchlist
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-900 border-gray-600 text-gray-100"
                  />
                  <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
                    <User className="mr-2 h-4 w-4" />
                    Login with Email
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-400">or</span>
                  </div>
                </div>
                
                <Button onClick={handleWalletConnect} variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's your security overview.</p>
          </div>
          <Button 
            onClick={() => setIsLoggedIn(false)} 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Audit History */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Audit History</CardTitle>
              <CardDescription className="text-gray-400">
                Your recent smart contract audits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-300">Contract</TableHead>
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Score</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditHistory.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="text-gray-100">{audit.contract}</TableCell>
                      <TableCell className="text-gray-400">{audit.date}</TableCell>
                      <TableCell>
                        <Badge className={`${getScoreColor(audit.score)} text-white`}>
                          {audit.score}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Watchlist */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Watchlist</CardTitle>
              <CardDescription className="text-gray-400">
                Monitor wallets and tokens for suspicious activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="0x... wallet or token address"
                  value={watchlistAddress}
                  onChange={(e) => setWatchlistAddress(e.target.value)}
                  className="bg-gray-900 border-gray-600 text-gray-100"
                />
                <Button onClick={addToWatchlist} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {watchlist.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-600">
                    <div>
                      <p className="text-white font-mono text-sm">{item.address}</p>
                      <p className="text-gray-400 text-xs">{item.label}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getRiskColor(item.risk)}>
                        {item.risk}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeFromWatchlist(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
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

export default Dashboard;
