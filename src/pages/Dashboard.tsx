import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Wallet, Trash2, Eye, Plus, Loader2, Activity, AlertCircle, Shield, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';
import SmartContractAudit from '@/components/SmartContractAudit';
import WalletRiskAnalyzer from '@/components/WalletRiskAnalyzer';

interface AuditRecord {
  id: string;
  contract_name: string;
  audit_score: string;
  audit_status: string;
  created_at: string;
  vulnerability_count?: number;
}

interface WatchlistItem {
  id: string;
  address: string;
  label: string;
  risk_level: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [watchlistAddress, setWatchlistAddress] = useState('');
  const [watchlistLabel, setWatchlistLabel] = useState('');
  const [auditHistory, setAuditHistory] = useState<AuditRecord[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToWatchlist, setAddingToWatchlist] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
      setupRealtimeSubscriptions();
    }
  }, [user]);

  const setupRealtimeSubscriptions = () => {
    if (!user) return;

    // Real-time subscription for audit history
    const auditChannel = supabase
      .channel('audit_history_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_history',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Audit history change:', payload);
          fetchData(); // Refresh data when changes occur
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "Audit Baru",
              description: `Audit untuk ${payload.new.contract_name} telah selesai`,
            });
          }
        }
      )
      .subscribe();

    // Real-time subscription for watchlist
    const watchlistChannel = supabase
      .channel('watchlist_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'watchlist',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Watchlist change:', payload);
          fetchData(); // Refresh data when changes occur
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "Watchlist Updated",
              description: `Address ${payload.new.address} ditambahkan ke watchlist`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(auditChannel);
      supabase.removeChannel(watchlistChannel);
    };
  };

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
      toast({
        title: "Error",
        description: "Gagal memuat data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async () => {
    if (!watchlistAddress.trim() || !user) return;

    setAddingToWatchlist(true);
    try {
      const { error } = await supabase
        .from('watchlist')
        .insert({
          user_id: user.id,
          address: watchlistAddress.trim(),
          label: watchlistLabel.trim() || 'New Address',
          risk_level: 'Unknown'
        });

      if (error) throw error;

      setWatchlistAddress('');
      setWatchlistLabel('');
      toast({
        title: "Berhasil",
        description: "Address berhasil ditambahkan ke watchlist",
      });
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan ke watchlist",
        variant: "destructive",
      });
    } finally {
      setAddingToWatchlist(false);
    }
  };

  const removeFromWatchlist = async (id: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Address berhasil dihapus dari watchlist",
      });
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus dari watchlist",
        variant: "destructive",
      });
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
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 pt-20 sm:pt-24 pb-8 sm:pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">SafeChain Dashboard</h1>
            <p className="text-gray-400 text-sm sm:text-base">Keamanan Web3 dengan AI-Powered Analysis</p>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-700 text-sm sm:text-base w-full sm:w-auto"
          >
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Total Audits</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{auditHistory.length}</p>
                </div>
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Watchlist Items</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{watchlist.length}</p>
                </div>
                <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">High Risk</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-400">
                    {watchlist.filter(item => item.risk_level === 'High').length}
                  </p>
                </div>
                <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">AI Status</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs sm:text-sm text-green-400 font-medium">Live</p>
                  </div>
                </div>
                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tools" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border-gray-700">
            <TabsTrigger value="tools" className="text-gray-300 data-[state=active]:text-white">
              AI Tools
            </TabsTrigger>
            <TabsTrigger value="history" className="text-gray-300 data-[state=active]:text-white">
              Audit History
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="text-gray-300 data-[state=active]:text-white">
              Watchlist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SmartContractAudit />
              <WalletRiskAnalyzer />
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg sm:text-xl">Riwayat Audit Smart Contract</CardTitle>
                <CardDescription className="text-gray-400 text-sm sm:text-base">
                  Hasil audit smart contract yang telah dilakukan
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {auditHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300 text-xs sm:text-sm">Contract</TableHead>
                          <TableHead className="text-gray-300 text-xs sm:text-sm hidden sm:table-cell">Tanggal</TableHead>
                          <TableHead className="text-gray-300 text-xs sm:text-sm">Score</TableHead>
                          <TableHead className="text-gray-300 text-xs sm:text-sm">Status</TableHead>
                          <TableHead className="text-gray-300 text-xs sm:text-sm w-16">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {auditHistory.map((audit) => (
                          <TableRow key={audit.id} className="border-gray-700">
                            <TableCell className="text-gray-100 text-xs sm:text-sm">
                              <div>
                                <p className="font-medium">{audit.contract_name}</p>
                                <p className="text-xs text-gray-400 sm:hidden">{formatDate(audit.created_at)}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-400 text-xs sm:text-sm hidden sm:table-cell">
                              {formatDate(audit.created_at)}
                            </TableCell>
                            <TableCell>
                              <Badge className={`${getScoreColor(audit.audit_score)} text-white text-xs`}>
                                {audit.audit_score}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={audit.audit_status === 'Passed' ? 'outline' : 'destructive'} className="text-xs">
                                {audit.audit_status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 h-8 w-8 p-0">
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-sm sm:text-base">Belum ada riwayat audit.</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-2">Mulai dengan mengaudit smart contract!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="watchlist">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg sm:text-xl">Watchlist Monitor</CardTitle>
                <CardDescription className="text-gray-400 text-sm sm:text-base">
                  Monitor wallet dan token untuk aktivitas mencurigakan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Input
                    placeholder="0x... alamat wallet atau token"
                    value={watchlistAddress}
                    onChange={(e) => setWatchlistAddress(e.target.value)}
                    className="bg-gray-900 border-gray-600 text-gray-100 text-sm"
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Label (opsional)"
                      value={watchlistLabel}
                      onChange={(e) => setWatchlistLabel(e.target.value)}
                      className="bg-gray-900 border-gray-600 text-gray-100 text-sm flex-1"
                    />
                    <Button 
                      onClick={addToWatchlist} 
                      disabled={addingToWatchlist || !watchlistAddress.trim()}
                      className="bg-purple-600 hover:bg-purple-700 px-3 sm:px-4"
                    >
                      {addingToWatchlist ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {watchlist.length > 0 ? (
                    watchlist.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-mono text-xs sm:text-sm truncate">{item.address}</p>
                          <p className="text-gray-400 text-xs">{item.label}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <Badge variant={getRiskColor(item.risk_level)} className="text-xs">
                            {item.risk_level}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => removeFromWatchlist(item.id)}
                            className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Eye className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-sm sm:text-base">Belum ada item di watchlist.</p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-2">Tambahkan alamat untuk memantaunya!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
