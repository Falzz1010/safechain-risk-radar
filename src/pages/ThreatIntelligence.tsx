
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, RefreshCw, Shield, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import { useSecurityData } from '@/hooks/useSecurityData';

const ThreatIntelligence = () => {
  const { threats, loading, error, refresh } = useSecurityData();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
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
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                <Eye className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                  Threat Intelligence
                </h1>
                <p className="text-gray-400 text-sm md:text-base">
                  Advanced threat detection and intelligence gathering
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4 md:p-6">
              <div className="text-center py-8 md:py-12">
                <Eye className="h-12 w-12 md:h-16 md:w-16 text-red-500 mx-auto mb-4" />
                <p className="text-red-400 text-lg">Error loading threat intelligence</p>
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
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <Eye className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                Threat Intelligence
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                AI-powered threat intelligence and risk assessment
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
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">Analyzing threat intelligence...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-gray-400 text-sm">Critical Threats</span>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold mt-2">
                    {threats.filter(t => t.severity === 'critical').length}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-400 text-sm">Avg Confidence</span>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold mt-2">
                    {((threats.reduce((sum, t) => sum + t.confidence, 0) / threats.length) * 100).toFixed(0)}%
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-gray-400 text-sm">Active Sources</span>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold mt-2">
                    {new Set(threats.map(t => t.source)).size}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Threat List */}
            <div className="space-y-3 md:space-y-4">
              {threats.map((threat) => (
                <Card key={threat.id} className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/60 transition-colors">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                          <h3 className="text-white font-semibold text-sm md:text-base">
                            {threat.threatType}
                          </h3>
                          <div className="flex gap-2 flex-wrap">
                            <Badge className={`${getSeverityColor(threat.severity)} text-xs`}>
                              {threat.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {threat.source}
                            </Badge>
                            <Badge variant="outline" className={`text-xs border-gray-600 ${getConfidenceColor(threat.confidence)}`}>
                              {(threat.confidence * 100).toFixed(0)}% Confidence
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4 break-words">
                          {threat.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="text-gray-400 text-xs font-medium mb-2">Threat Indicators:</h4>
                          <div className="flex flex-wrap gap-1">
                            {threat.indicators.map((indicator, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                                {indicator}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(threat.timestamp)}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 flex-shrink-0">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs">
                          Analyze
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white text-xs">
                          Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ThreatIntelligence;
