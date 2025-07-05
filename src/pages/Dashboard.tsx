import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Wallet, Trash2, Eye, Plus, Loader2, Activity, AlertCircle, Shield, TrendingUp, Zap, Search, Filter, Download, RefreshCw, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';
import SmartContractAudit from '@/components/SmartContractAudit';
import WalletRiskAnalyzer from '@/components/WalletRiskAnalyzer';
import AuditDetailModal from '@/components/AuditDetailModal';
import { getScoreColor, formatDate } from '@/lib/utils';

interface AuditRecord {
  id: string;
  contract_name: string;
  audit_score: string;
  audit_status: string;
  created_at: string;
  vulnerability_count?: number;
  contract_code?: string;
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
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAudit, setSelectedAudit] = useState<AuditRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
          fetchData();
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "✅ Audit Selesai",
              description: `Smart contract ${payload.new.contract_name} berhasil diaudit`,
            });
          }
        }
      )
      .subscribe();

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
          fetchData();
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "🎯 Watchlist Updated",
              description: `Address berhasil ditambahkan ke monitoring`,
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
          .limit(20),
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
        title: "❌ Error",
        description: "Gagal memuat data dashboard",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setTimeout(() => setRefreshing(false), 500);
    toast({
      title: "🔄 Data Diperbarui",
      description: "Dashboard berhasil direfresh",
    });
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
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast({
        title: "❌ Error",
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
        title: "✅ Berhasil",
        description: "Address berhasil dihapus dari watchlist",
      });
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast({
        title: "❌ Error",
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

  const handleViewAudit = (audit: AuditRecord) => {
    setSelectedAudit(audit);
    setIsDetailModalOpen(true);
  };

  const handleCopyAuditId = (auditId: string) => {
    navigator.clipboard.writeText(auditId);
    toast({
      title: "✅ Berhasil",
      description: "ID Audit berhasil disalin",
    });
  };

  const handleDeleteAudit = async (auditId: string) => {
    try {
      const { error } = await supabase
        .from('audit_history')
        .delete()
        .eq('id', auditId);

      if (error) throw error;

      toast({
        title: "✅ Berhasil",
        description: "Riwayat audit berhasil dihapus",
      });
    } catch (error) {
      console.error('Error deleting audit:', error);
      toast({
        title: "❌ Error",
        description: "Gagal menghapus riwayat audit",
        variant: "destructive",
      });
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

  const filteredAudits = auditHistory.filter(audit => {
    const matchesSearch = audit.contract_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || audit.audit_status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const filteredWatchlist = watchlist.filter(item =>
    item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto" />
            <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-blue-400/30 mx-auto animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-white">SafeChain Dashboard</p>
            <p className="text-gray-400">Memuat data keamanan Web3...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const statsData = [
    {
      title: "Total Audits",
      value: auditHistory.length,
      icon: Shield,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      trend: "+12%"
    },
    {
      title: "Watchlist Items",
      value: watchlist.length,
      icon: Eye,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      trend: "+8%"
    },
    {
      title: "High Risk",
      value: watchlist.filter(item => item.risk_level === 'High').length,
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      trend: "-5%"
    },
    {
      title: "AI Status",
      value: "Live",
      icon: Activity,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      trend: "100%"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Navbar />
        
        <div className="container mx-auto px-4 lg:px-6 pt-20 sm:pt-24 pb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 animate-fade-in">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    SafeChain Dashboard
                  </h1>
                  <p className="text-gray-400 text-sm lg:text-base">
                    AI-Powered Web3 Security Analysis • Real-time Monitoring
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <Button 
                onClick={handleRefresh}
                disabled={refreshing}
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all duration-200 flex-1 lg:flex-initial"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all duration-200 flex-1 lg:flex-initial"
              >
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 animate-fade-in">
            {statsData.map((stat, index) => (
              <Card key={stat.title} className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-900/20">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 lg:h-6 lg:w-6 ${stat.color}`} />
                    </div>
                    <span className="text-xs text-green-400 font-medium">{stat.trend}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs lg:text-sm text-gray-400 font-medium">{stat.title}</p>
                    <p className="text-xl lg:text-2xl font-bold text-white">
                      {typeof stat.value === 'number' ? stat.value : (
                        <div className="flex items-center gap-2">
                          <span>{stat.value}</span>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="tools" className="space-y-6 animate-fade-in">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/40 backdrop-blur-sm border-gray-700/50 p-1 rounded-lg">
              <TabsTrigger 
                value="tools" 
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50 transition-all duration-200 rounded-md"
              >
                <Zap className="h-4 w-4 mr-2" />
                AI Tools
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50 transition-all duration-200 rounded-md"
              >
                <Shield className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger 
                value="watchlist" 
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50 transition-all duration-200 rounded-md"
              >
                <Eye className="h-4 w-4 mr-2" />
                Watchlist
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tools" className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="animate-scale-in">
                  <SmartContractAudit />
                </div>
                <div className="animate-scale-in" style={{animationDelay: '100ms'}}>
                  <WalletRiskAnalyzer />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                      <CardTitle className="text-white text-xl flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-400" />
                        Riwayat Audit Smart Contract
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-1">
                        Hasil audit dan analisis keamanan smart contract
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                      <div className="relative flex-1 lg:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Cari contract..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-gray-900/50 border-gray-600 text-gray-100 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-gray-100 focus:border-blue-500 transition-colors"
                      >
                        <option value="all">Semua Status</option>
                        <option value="passed">Passed</option>
                        <option value="warning">Warning</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {filteredAudits.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700 hover:bg-gray-800/20">
                            <TableHead className="text-gray-300 font-medium">Contract</TableHead>
                            <TableHead className="text-gray-300 font-medium hidden lg:table-cell">Tanggal</TableHead>
                            <TableHead className="text-gray-300 font-medium">Score</TableHead>
                            <TableHead className="text-gray-300 font-medium">Status</TableHead>
                            <TableHead className="text-gray-300 font-medium hidden sm:table-cell">Vulnerabilities</TableHead>
                            <TableHead className="text-gray-300 font-medium w-32">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAudits.map((audit, index) => (
                            <TableRow 
                              key={audit.id} 
                              className="border-gray-700 hover:bg-gray-800/30 transition-colors animate-fade-in"
                              style={{animationDelay: `${index * 50}ms`}}
                            >
                              <TableCell className="text-gray-100">
                                <div>
                                  <p className="font-medium text-white">{audit.contract_name}</p>
                                  <p className="text-xs text-gray-400 lg:hidden">{formatDate(audit.created_at)}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-400 text-sm hidden lg:table-cell">
                                {formatDate(audit.created_at)}
                              </TableCell>
                              <TableCell>
                                <Badge className={`${getScoreColor(audit.audit_score)} text-white text-xs font-medium shadow-lg border-0`}>
                                  {audit.audit_score}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={audit.audit_status === 'Passed' ? 'outline' : 'destructive'} 
                                  className="text-xs font-medium"
                                >
                                  {audit.audit_status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <span className="text-sm text-gray-300">
                                  {audit.vulnerability_count || 0}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => handleViewAudit(audit)}
                                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 h-8 w-8 p-0 transition-colors"
                                    title="Lihat Detail"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => handleCopyAuditId(audit.id)}
                                    className="text-gray-400 hover:text-gray-300 hover:bg-gray-500/10 h-8 w-8 p-0 transition-colors"
                                    title="Copy ID"
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => handleDeleteAudit(audit.id)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0 transition-colors"
                                    title="Hapus"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-12 animate-fade-in">
                      <div className="mx-auto w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                        <Shield className="h-12 w-12 text-gray-600" />
                      </div>
                      <p className="text-gray-400 text-lg font-medium">
                        {searchTerm || filterStatus !== 'all' ? 'Tidak ada hasil yang ditemukan' : 'Belum ada riwayat audit'}
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        {searchTerm || filterStatus !== 'all' ? 'Coba ubah filter pencarian' : 'Mulai dengan mengaudit smart contract di tab AI Tools'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="watchlist">
              <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center gap-2">
                    <Eye className="h-5 w-5 text-purple-400" />
                    Watchlist Monitor
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Monitor alamat wallet dan token untuk aktivitas mencurigakan
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 space-y-4">
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Tambah ke Watchlist
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <Input
                        placeholder="0x... alamat wallet atau token"
                        value={watchlistAddress}
                        onChange={(e) => setWatchlistAddress(e.target.value)}
                        className="bg-gray-900/50 border-gray-600 text-gray-100 focus:border-purple-500 transition-colors font-mono text-sm"
                      />
                      <div className="flex gap-2">
                        <Input
                          placeholder="Label (opsional)"
                          value={watchlistLabel}
                          onChange={(e) => setWatchlistLabel(e.target.value)}
                          className="bg-gray-900/50 border-gray-600 text-gray-100 focus:border-purple-500 transition-colors flex-1"
                        />
                        <Button 
                          onClick={addToWatchlist} 
                          disabled={addingToWatchlist || !watchlistAddress.trim()}
                          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg shadow-purple-500/25"
                        >
                          {addingToWatchlist ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Cari alamat atau label..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-900/50 border-gray-600 text-gray-100 focus:border-purple-500 transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {filteredWatchlist.length > 0 ? (
                      filteredWatchlist.map((item, index) => (
                        <div 
                          key={item.id} 
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900/40 to-gray-800/40 rounded-lg border border-gray-600/50 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/20 animate-fade-in"
                          style={{animationDelay: `${index * 50}ms`}}
                        >
                          <div className="flex-1 min-w-0 space-y-1">
                            <p className="text-white font-mono text-sm truncate font-medium">{item.address}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-gray-400 text-xs">{item.label}</p>
                              <span className="text-gray-500 text-xs">•</span>
                              <p className="text-gray-500 text-xs">{formatDate(item.created_at)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 ml-4">
                            <Badge variant={getRiskColor(item.risk_level)} className="text-xs font-medium">
                              {item.risk_level}
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => removeFromWatchlist(item.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 animate-fade-in">
                        <div className="mx-auto w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                          <Eye className="h-12 w-12 text-gray-600" />
                        </div>
                        <p className="text-gray-400 text-lg font-medium">
                          {searchTerm ? 'Tidak ada hasil yang ditemukan' : 'Belum ada item di watchlist'}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          {searchTerm ? 'Coba kata kunci yang berbeda' : 'Tambahkan alamat untuk memantau aktivitasnya'}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AuditDetailModal 
        audit={selectedAudit}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedAudit(null);
        }}
      />

      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(31, 41, 55, 0.5);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(75, 85, 99, 0.8);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(107, 114, 128, 1);
          }
        `}
      </style>
    </>
  );
};

export default Dashboard;
