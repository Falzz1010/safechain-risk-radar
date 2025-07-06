
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Shield, AlertTriangle, TrendingUp, Search, Filter, ExternalLink, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface ThreatData {
  id: string;
  title: string;
  description: string;
  category: 'malware' | 'phishing' | 'scam' | 'vulnerability' | 'exploit';
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  timestamp: string;
  addresses: string[];
  urls: string[];
  tags: string[];
}

const mockThreats: ThreatData[] = [
  {
    id: '1',
    title: 'New DeFi Rug Pull Detected',
    description: 'Suspicious DeFi protocol showing signs of exit scam. Liquidity being drained systematically.',
    category: 'scam',
    severity: 'critical',
    source: 'AI Analysis',
    timestamp: '2024-01-15T10:30:00Z',
    addresses: ['0x1234567890abcdef1234567890abcdef12345678'],
    urls: ['https://malicious-defi.com'],
    tags: ['defi', 'rug-pull', 'exit-scam']
  },
  {
    id: '2',
    title: 'MetaMask Phishing Campaign',
    description: 'Fake MetaMask websites collecting seed phrases and private keys from users.',
    category: 'phishing',
    severity: 'high',
    source: 'Community Report',
    timestamp: '2024-01-15T09:15:00Z',
    addresses: [],
    urls: ['https://fake-metamask.net', 'https://meta-mask-support.org'],
    tags: ['metamask', 'phishing', 'wallet']
  },
  {
    id: '3',
    title: 'Smart Contract Vulnerability',
    description: 'Reentrancy vulnerability found in popular lending protocol.',
    category: 'vulnerability',
    severity: 'medium',
    source: 'Security Audit',
    timestamp: '2024-01-15T08:45:00Z',
    addresses: ['0xabcdef1234567890abcdef1234567890abcdef12'],
    urls: [],
    tags: ['smart-contract', 'reentrancy', 'defi']
  }
];

export default function ThreatIntelligence() {
  const [threats, setThreats] = useState<ThreatData[]>(mockThreats);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'malware': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'phishing': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'scam': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'vulnerability': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'exploit': return 'bg-pink-500/20 text-pink-400 border-pink-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || threat.category === filterCategory;
    const matchesSeverity = filterSeverity === 'all' || threat.severity === filterSeverity;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-6 pt-20 sm:pt-24 pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white">Threat Intelligence</h1>
                <p className="text-gray-400">Latest security threats and attack patterns in Web3</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
              <Shield className="h-4 w-4 mr-2" />
              Submit Threat
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Threats</p>
                  <p className="text-2xl font-bold text-red-400">{threats.length}</p>
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
                    {threats.filter(t => t.severity === 'critical').length}
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
                  <p className="text-sm text-gray-400">Phishing</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {threats.filter(t => t.category === 'phishing').length}
                  </p>
                </div>
                <Globe className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">This Week</p>
                  <p className="text-2xl font-bold text-purple-400">+{threats.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
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
                  placeholder="Search threats, tags, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-600 text-gray-100"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-gray-100"
              >
                <option value="all">All Categories</option>
                <option value="malware">Malware</option>
                <option value="phishing">Phishing</option>
                <option value="scam">Scam</option>
                <option value="vulnerability">Vulnerability</option>
                <option value="exploit">Exploit</option>
              </select>
              
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
            </div>
          </CardContent>
        </Card>

        {/* Threats List */}
        <div className="space-y-4">
          {filteredThreats.map((threat) => (
            <Card key={threat.id} className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/60 transition-all duration-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{threat.title}</h3>
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getCategoryColor(threat.category)}>
                          {threat.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300">{threat.description}</p>
                      
                      {threat.addresses.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-sm text-gray-400">Malicious Addresses:</span>
                          {threat.addresses.map((address, index) => (
                            <code key={index} className="block text-sm bg-gray-900/50 px-2 py-1 rounded text-red-400 font-mono">
                              {address}
                            </code>
                          ))}
                        </div>
                      )}
                      
                      {threat.urls.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-sm text-gray-400">Malicious URLs:</span>
                          {threat.urls.map((url, index) => (
                            <code key={index} className="block text-sm bg-gray-900/50 px-2 py-1 rounded text-orange-400 font-mono">
                              {url}
                            </code>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {threat.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-gray-300 text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{new Date(threat.timestamp).toLocaleString()}</span>
                        <span>•</span>
                        <span>Source: {threat.source}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredThreats.length === 0 && (
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-12 text-center">
              <Eye className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No threats found</h3>
              <p className="text-gray-500">No threats match your current filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
