
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Audit = () => {
  const [code, setCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  const handleScan = async () => {
    if (!code.trim()) return;
    
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanResults({
        securityScore: 'B',
        vulnerabilities: [
          { type: 'Reentrancy', severity: 'High', description: 'Potensi serangan reentrancy terdeteksi pada fungsi withdraw' },
          { type: 'Integer Overflow', severity: 'Medium', description: 'Kemungkinan overflow pada operasi matematika' },
          { type: 'Access Control', severity: 'Low', description: 'Modifier akses dapat diperbaiki untuk keamanan lebih baik' }
        ],
        aiSummary: 'Kontrak ini memiliki risiko sedang dengan beberapa kerentanan yang perlu diperbaiki. Terutama pada fungsi withdraw yang berpotensi mengalami serangan reentrancy.'
      });
      setIsScanning(false);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'secondary';
    }
  };

  const getScoreColor = (score) => {
    switch (score) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-yellow-500';
      case 'C': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Smart Contract Audit</h1>
          <p className="text-gray-400">Paste your Solidity code below to scan for vulnerabilities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Input Section */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Smart Contract Code
              </CardTitle>
              <CardDescription className="text-gray-400">
                Paste your Solidity (.sol) contract code here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="pragma solidity ^0.8.0;&#10;&#10;contract MyContract {&#10;    // Your contract code here&#10;}"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[400px] bg-gray-900 border-gray-600 text-gray-100 font-mono"
              />
              <Button 
                onClick={handleScan}
                disabled={!code.trim() || isScanning}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isScanning ? 'Scanning...' : 'Scan Contract'}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {scanResults && (
              <>
                {/* Security Score */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      Security Score
                      <Badge className={`${getScoreColor(scanResults.securityScore)} text-white text-lg px-3 py-1`}>
                        {scanResults.securityScore}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                </Card>

                {/* AI Summary */}
                <Alert className="bg-blue-900/20 border-blue-700">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-blue-200">
                    <strong>AI Analysis:</strong> {scanResults.aiSummary}
                  </AlertDescription>
                </Alert>

                {/* Vulnerabilities */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Detected Vulnerabilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scanResults.vulnerabilities.map((vuln, index) => (
                      <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{vuln.type}</h4>
                          <Badge variant={getSeverityColor(vuln.severity)}>
                            {vuln.severity}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{vuln.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Download Report */}
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download JSON
                  </Button>
                </div>
              </>
            )}

            {!scanResults && !isScanning && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center text-gray-400">
                    <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Paste your contract code and click "Scan Contract" to see results</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {isScanning && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center text-gray-400">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p>Analyzing your smart contract...</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audit;
