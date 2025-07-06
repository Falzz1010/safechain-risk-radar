
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, RefreshCw, Eye, Clock } from 'lucide-react';
import { useSecurityData } from '@/hooks/useSecurityData';

const SecurityAlerts = () => {
  const { alerts, loading, error, refresh } = useSecurityData();
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'threat': return <AlertTriangle className="h-4 w-4" />;
      case 'vulnerability': return <Shield className="h-4 w-4" />;
      case 'suspicious': return <Eye className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
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
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                  Security Alerts
                </h1>
                <p className="text-gray-400 text-sm md:text-base">
                  Real-time security monitoring and threat detection
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4 md:p-6">
              <div className="text-center py-8 md:py-12">
                <AlertTriangle className="h-12 w-12 md:h-16 md:w-16 text-red-500 mx-auto mb-4" />
                <p className="text-red-400 text-lg">Error loading security alerts</p>
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
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                Security Alerts
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Real-time security monitoring and threat detection
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
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">Loading security alerts...</p>
              </div>
            </CardContent>
          </Card>
        ) : alerts.length === 0 ? (
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4 md:p-6">
              <div className="text-center py-8 md:py-12">
                <Shield className="h-12 w-12 md:h-16 md:w-16 text-green-600 mx-auto mb-4" />
                <p className="text-green-400 text-lg">No security alerts at this time</p>
                <p className="text-gray-500 text-sm mt-2">Your system is secure</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/60 transition-colors">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-white font-semibold text-sm md:text-base truncate">
                            {alert.title}
                          </h3>
                          <div className="flex gap-2 flex-wrap">
                            <Badge className={`${getSeverityColor(alert.severity)} text-xs`}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {alert.type.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-3 break-words">
                          {alert.description}
                        </p>
                        {alert.address && (
                          <p className="text-blue-400 text-xs font-mono mb-2 break-all">
                            Address: {alert.address}
                          </p>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimestamp(alert.timestamp)}
                          </div>
                          <div className="hidden sm:block">•</div>
                          <span className="capitalize">Status: {alert.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs">
                        Investigate
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white text-xs">
                        Mark Safe
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SecurityAlerts;
