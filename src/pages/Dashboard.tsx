
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
import { useToast } from '@/hooks/use-toast';
import SmartContractAudit from '@/components/SmartContractAudit';
import WalletRiskAnalyzer from '@/components/WalletRiskAnalyzer';
import AuditDetailModal from '@/components/AuditDetailModal';
import AIAnalysisChat from '@/components/AIAnalysisChat';
import DashboardLayout from '@/components/DashboardLayout';
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
  const [aiChatVisible, setAiChatVisible] = useState(false);
  const [selectedContractCode, setSelectedContractCode] = useState('');

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

    // Real-time audit history subscription with Gemini AI integration
    const auditChannel = supabase
      .channel('audit_history_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_history',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('🤖 Real-time audit update from Gemini AI:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newAudit = payload.new as AuditRecord;
            setAuditHistory(prev => [newAudit, ...prev]);
            
            toast({
              title: "🤖 Gemini AI Analysis Complete",
              description: `Smart contract "${newAudit.contract_name}" analyzed with AI score ${newAudit.audit_score}`,
              duration: 5000,
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedAudit = payload.new as AuditRecord;
            setAuditHistory(prev => 
              prev.map(audit => 
                audit.id === updatedAudit.id ? updatedAudit : audit
              )
            );
            
            toast({
              title: "🔄 Gemini AI Update",
              description: `Analysis updated for ${updatedAudit.contract_name}`,
            });
          } else if (payload.eventType === 'DELETE') {
            setAuditHistory(prev => 
              prev.filter(audit => audit.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    // Real-time watchlist subscription with AI risk analysis
    const watchlistChannel = supabase
      .channel('watchlist_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'watchlist',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('🎯 Real-time watchlist update with AI analysis:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newItem = payload.new as WatchlistItem;
            setWatchlist(prev => [newItem, ...prev]);
            
            toast({
              title: "🎯 Gemini AI Monitoring Started",
              description: `AI is analyzing risk for ${newItem.label}`,
              duration: 4000,
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem = payload.new as WatchlistItem;
            setWatchlist(prev => 
              prev.map(item => 
                item.id === updatedItem.id ? updatedItem : item
              )
            );
            
            if (payload.old.risk_level !== updatedItem.risk_level) {
              toast({
                title: "⚠️ Gemini AI Risk Update",
                description: `${updatedItem.label} risk level: ${updatedItem.risk_level}`,
                duration: 4000,
              });
            }
          } else if (payload.eventType === 'DELETE') {
            setWatchlist(prev => 
              prev.filter(item => item.id !== payload.old.id)
            );
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
        description: "Failed to load dashboard data",
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
      title: "🔄 Real-time Data Synced",
      description: "Gemini AI data updated successfully",
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
          risk_level: 'Analyzing...'
        });

      if (error) throw error;

      setWatchlistAddress('');
      setWatchlistLabel('');
      
      toast({
        title: "🤖 Gemini AI Analysis Started",
        description: "Wallet added and AI is analyzing risk level...",
      });
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast({
        title: "❌ Error",
        description: "Failed to add to watchlist",
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
        title: "✅ Removed",
        description: "Address removed from AI monitoring",
      });
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast({
        title: "❌ Error",
        description: "Failed to remove from watchlist",
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
      title: "✅ Copied",
      description: "Audit ID copied to clipboard",
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
        title: "✅ Deleted",
        description: "Audit record removed",
      });
    } catch (error) {
      console.error('Error deleting audit:', error);
      toast({
        title: "❌ Error",
        description: "Failed to delete audit record",
        variant: "destructive",
      });
    }
  };

  const handleAIChat = (contractCode: string = '') => {
    setSelectedContractCode(contractCode);
    setAiChatVisible(true);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      case 'Analyzing...': return 'outline';
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
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto" />
              <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-blue-400/30 mx-auto animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-white">SafeChain AI Dashboard</p>
              <p className="text-gray-400">Initializing Gemini AI security analysis...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return null;
  }

  const statsData = [
    {
      title: "Gemini AI Audits",
      value: auditHistory.length,
      icon: Shield,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      trend: "+12%"
    },
    {
      title: "AI Monitored Wallets",
      value: watchlist.length,
      icon: Eye,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      trend: "+8%"
    },
    {
      title: "High Risk Alerts",
      value: watchlist.filter(item => item.risk_level === 'High').length,
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      trend: "-5%"
    },
    {
      title: "Gemini AI Status",
      value: "Live",
      icon: Activity,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      trend: "Real-time"
    }
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 lg:px-6 pt-8 pb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 animate-fade-in">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    SafeChain Gemini AI Dashboard
                  </h1>
                  <p className="text-gray-400 text-sm lg:text-base">
                    Real-time Gemini AI Security Analysis • Live Monitoring • Instant AI Alerts
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <Button 
                onClick={() => handleAIChat()}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-500/25 flex-1 lg:flex-initial"
              >
                <Activity className="h-4 w-4 mr-2" />
                Gemini AI Chat
              </Button>
              <Button 
                onClick={handleRefresh}
                disabled={refreshing}
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all duration-200 flex-1 lg:flex-initial"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Sync AI
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

          {/* Stats Cards */}
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

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {aiChatVisible && (
              <div className="xl:col-span-1 animate-fade-in">
                <div className="relative">
                  <Button 
                    onClick={() => setAiChatVisible(false)}
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10 text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                  <AIAnalysisChat contractCode={selectedContractCode} />
                </div>
              </div>
            )}
            
            <div className={`${aiChatVisible ? 'xl:col-span-2' : 'xl:col-span-3'} transition-all duration-300`}>
              <Tabs defaultValue="tools" className="space-y-6 animate-fade-in">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800/40 backdrop-blur-sm border-gray-700/50 p-1 rounded-lg">
                  <TabsTrigger 
                    value="tools" 
                    className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50 transition-all duration-200 rounded-md"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Gemini AI Tools
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50 transition-all duration-200 rounded-md"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    AI History
                  </TabsTrigger>
                  <TabsTrigger 
                    value="watchlist" 
                    className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50 transition-all duration-200 rounded-md"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    AI Monitor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tools" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            Gemini AI Audit History (Real-time)
                          </CardTitle>
                          <CardDescription className="text-gray-400 mt-1">
                            Live updates from Gemini AI security analysis
                          </CardDescription>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                          <div className="relative flex-1 lg:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search contracts..."
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
                            <option value="all">All Status</option>
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
                                <TableHead className="text-gray-300 font-medium hidden lg:table-cell">Date</TableHead>
                                <TableHead className="text-gray-300 font-medium">Gemini AI Score</TableHead>
                                <TableHead className="text-gray-300 font-medium">Status</TableHead>
                                <TableHead className="text-gray-300 font-medium hidden sm:table-cell">Vulnerabilities</TableHead>
                                <TableHead className="text-gray-300 font-medium w-40">Actions</TableHead>
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
                                        title="View Details"
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => handleAIChat(audit.contract_code || '')}
                                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10 h-8 w-8 p-0 transition-colors"
                                        title="Gemini AI Chat"
                                      >
                                        <Activity className="h-4 w-4" />
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
                                        title="Delete"
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
                            {searchTerm || filterStatus !== 'all' ? 'No results found' : 'No Gemini AI audits yet'}
                          </p>
                          <p className="text-gray-500 text-sm mt-2">
                            {searchTerm || filterStatus !== 'all' ? 'Try different search terms' : 'Start by auditing smart contracts with Gemini AI'}
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
                        Gemini AI Wallet Monitor (Live)
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Real-time Gemini AI risk analysis and monitoring
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 space-y-4">
                        <h3 className="text-white font-medium flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Add to Gemini AI Monitor
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <Input
                            placeholder="0x... wallet or token address"
                            value={watchlistAddress}
                            onChange={(e) => setWatchlistAddress(e.target.value)}
                            className="bg-gray-900/50 border-gray-600 text-gray-100 focus:border-purple-500 transition-colors font-mono text-sm"
                          />
                          <div className="flex gap-2">
                            <Input
                              placeholder="Label (optional)"
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
                          placeholder="Search address or label..."
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
                                  {item.risk_level === 'Analyzing...' && (
                                    <>
                                      <span className="text-gray-500 text-xs">•</span>
                                      <div className="flex items-center gap-1">
                                        <Loader2 className="h-3 w-3 animate-spin text-blue-400" />
                                        <span className="text-blue-400 text-xs">Gemini AI analyzing...</span>
                                      </div>
                                    </>
                                  )}
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
                              {searchTerm ? 'No results found' : 'No wallets monitored yet'}
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                              {searchTerm ? 'Try different keywords' : 'Add wallet addresses for Gemini AI risk monitoring'}
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
          
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
          
          .animate-scale-in {
            animation: scale-in 0.6s ease-out;
          }
        `}
      </style>
    </DashboardLayout>
  );
};

export default Dashboard;
