
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Shield, Clock, Search, Filter, Bell, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'smart_contract' | 'wallet' | 'transaction' | 'network';
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
  address?: string;
}

const mockAlerts: SecurityAlert[] = [
  {
    id: '1',
    title: 'Suspicious Smart Contract Detected',
    description: 'Contract 0x1234...abcd shows potential honeypot characteristics',
    severity: 'critical',
    category: 'smart_contract',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'active',
    address: '0x1234567890abcdef1234567890abcdef12345678'
  },
  {
    id: '2',
    title: 'High-Risk Transaction Pattern',
    description: 'Multiple large transactions from unknown wallet detected',
    severity: 'high',
    category: 'transaction',
    timestamp: '2024-01-15T09:15:00Z',
    status: 'investigating',
    address: '0xabcdef1234567890abcdef1234567890abcdef12'
  },
  {
    id: '3',
    title: 'Wallet Security Warning',
    description: 'Wallet connected to known malicious contracts',
    severity: 'medium',
    category: 'wallet',
    timestamp: '2024-01-15T08:45:00Z',
    status: 'resolved',
    address: '0x9876543210fedcba9876543210fedcba98765432'
  }
];

export default function SecurityAlerts() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'investigating': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (alert.address && alert.address.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-6 pt-20 sm:pt-24 pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white">Security Alerts</h1>
                <p className="text-gray-400">Real-time security monitoring and threat detection</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
              <Bell className="h-4 w-4 mr-2" />
              Configure Alerts
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Alerts</p>
                  <p className="text-2xl font-bold text-red-400">
                    {alerts.filter(a => a.status === 'active').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Critical</p>
                  <p className="text-2xl font-bold text-red-400">
                    {alerts.filter(a => a.severity === 'critical').length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Investigating</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {alerts.filter(a => a.status === 'investigating').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Resolved</p>
                  <p className="text-2xl font-bold text-green-400">
                    {alerts.filter(a => a.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
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
                  placeholder="Search alerts, addresses, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-600 text-gray-100"
                />
              </div>
              
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-gray-100"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-gray-100"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/60 transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(alert.status)}
                      <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-gray-300">
                        {alert.category.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300">{alert.description}</p>
                    
                    {alert.address && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Address:</span>
                        <code className="text-sm bg-gray-900/50 px-2 py-1 rounded text-blue-400 font-mono">
                          {alert.address}
                        </code>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                      <span>•</span>
                      <span className="capitalize">{alert.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      Investigate
                    </Button>
                    {alert.status === 'active' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredAlerts.length === 0 && (
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No alerts found</h3>
              <p className="text-gray-500">No security alerts match your current filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
