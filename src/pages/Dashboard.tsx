
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Wallet, Trash2, Eye, Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

interface AuditRecord {
  id: string;
  contract_name: string;
  audit_score: string;
  audit_status: string;
  created_at: string;
}

interface WatchlistItem {
  id: string;
  address: string;
  label: string;
  risk_level: string;
}

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [watchlistAddress, setWatchlistAddress] = useState('');
  const [auditHistory, setAuditHistory] = useState<AuditRecord[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [auditResponse, watchlistResponse] = await Promise.all([
        supabase
          .from('audit_history')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('watchlist')
          .select('*')
          .order('created_at', { ascending: false })
      ]);

      if (auditResponse.error) throw auditResponse.error;
      if (watchlistResponse.error) throw watchlistResponse.error;

      setAuditHistory(auditResponse.data || []);
      setWatchlist(watchlistResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async () => {
    if (!watchlistAddress.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('watchlist')
        .insert({
          user_id: user.id,
          address: watchlistAddress,
          label: 'New Address',
          risk_level: 'Unknown'
        });

      if (error) throw error;

      setWatchlistAddress('');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (id: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-yellow-500';
      case 'C': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
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
            onClick={handleLogout} 
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
              {auditHistory.length > 0 ? (
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
                        <TableCell className="text-gray-100">{audit.contract_name}</TableCell>
                        <TableCell className="text-gray-400">{formatDate(audit.created_at)}</TableCell>
                        <TableCell>
                          <Badge className={`${getScoreColor(audit.audit_score)} text-white`}>
                            {audit.audit_score}
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
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No audit history yet.</p>
                  <p className="text-gray-500 text-sm mt-2">Start by auditing a smart contract!</p>
                </div>
              )}
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
                {watchlist.length > 0 ? (
                  watchlist.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-600">
                      <div>
                        <p className="text-white font-mono text-sm">{item.address}</p>
                        <p className="text-gray-400 text-xs">{item.label}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getRiskColor(item.risk_level)}>
                          {item.risk_level}
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
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No items in watchlist yet.</p>
                    <p className="text-gray-500 text-sm mt-2">Add addresses to monitor them!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
