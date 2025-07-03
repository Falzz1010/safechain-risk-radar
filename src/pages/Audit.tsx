
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Shield, AlertTriangle, CheckCircle, Code, FileText, Bot, Sparkles, Zap, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';
import InteractiveAuditDemo from '@/components/InteractiveAuditDemo';
import AIAnalysisChat from '@/components/AIAnalysisChat';

const Audit = () => {
  const [code, setCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  const sampleContract = `pragma solidity ^0.8.0;

contract VulnerableBank {
    mapping(address => uint256) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Vulnerability: External call before state update (Reentrancy)
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] -= amount; // State update after external call
    }
    
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}`;

  const handleScan = async () => {
    if (!code.trim()) return;
    
    setIsScanning(true);
    
    // Simulate realistic scanning process with enhanced feedback
    setTimeout(() => {
      setScanResults({
        securityScore: 'C',
        riskLevel: 'High',
        totalIssues: 5,
        criticalIssues: 2,
        vulnerabilities: [
          { 
            type: 'Reentrancy Attack', 
            severity: 'Critical', 
            line: 15,
            description: 'External call sebelum update state di fungsi withdraw memungkinkan serangan reentrancy',
            impact: 'Penyerang dapat menguras dana kontrak',
            gasUsed: 'High',
            codeSnippet: 'msg.sender.call{value: amount}("");',
            solution: 'Gunakan pattern checks-effects-interactions atau ReentrancyGuard'
          },
          { 
            type: 'Integer Overflow', 
            severity: 'High', 
            line: 8,
            description: 'Operasi aritmatika tanpa pengecekan dapat menyebabkan integer overflow',
            impact: 'Manipulasi saldo token dimungkinkan',
            gasUsed: 'Medium',
            codeSnippet: 'balances[msg.sender] += msg.value;',
            solution: 'Gunakan SafeMath library atau Solidity 0.8+ built-in checks'
          },
          { 
            type: 'Access Control', 
            severity: 'Medium', 
            line: 12,
            description: 'Tidak ada kontrol akses pada fungsi withdraw',
            impact: 'Siapapun dapat mencoba withdraw',
            gasUsed: 'Low',
            codeSnippet: 'function withdraw(uint256 amount) public',
            solution: 'Implementasikan proper access control dengan modifier'
          },
          { 
            type: 'Gas Limit', 
            severity: 'Low', 
            line: 15,
            description: 'External call tanpa spesifikasi gas limit',
            impact: 'Potensi out-of-gas error',
            gasUsed: 'Variable',
            codeSnippet: 'msg.sender.call{value: amount}("");',
            solution: 'Tentukan gas limit yang tepat untuk external calls'
          },
          { 
            type: 'Event Logging', 
            severity: 'Low', 
            line: 0,
            description: 'Tidak ada event emission untuk perubahan state',
            impact: 'Transparansi dan monitoring yang buruk',
            gasUsed: 'Low',
            codeSnippet: 'No events defined',
            solution: 'Tambahkan event untuk semua perubahan state penting'
          }
        ],
        aiSummary: 'Kontrak ini mengandung kerentanan keamanan kritis yang membuatnya sangat rentan terhadap serangan reentrancy. Fungsi withdraw memungkinkan external call sebelum mengupdate state internal, yang merupakan kerentanan reentrancy klasik. Perbaikan segera diperlukan sebelum deployment.',
        recommendations: [
          'Implementasikan pattern checks-effects-interactions',
          'Gunakan ReentrancyGuard dari OpenZeppelin',
          'Tambahkan kontrol akses yang komprehensif',
          'Implementasikan event logging yang proper',
          'Pertimbangkan menggunakan pull payment pattern'
        ],
        gasAnalysis: {
          deployment: '245,678 gas',
          avgTransaction: '45,231 gas',
          optimization: 'Medium'
        }
      });
      setIsScanning(false);
    }, 3500);
  };

  const loadSample = () => {
    setCode(sampleContract);
  };

  const downloadReport = (format) => {
    const reportData = {
      contractAnalysis: scanResults,
      timestamp: new Date().toISOString(),
      format: format
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: format === 'json' ? 'application/json' : 'text/plain'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-report.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'destructive';
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Smart Contract Security Audit
          </h1>
          <p className="text-gray-400 text-lg">Deteksi kerentanan bertenaga AI canggih untuk kontrak Solidity</p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">AI Real-time</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">Gemini Powered</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="audit" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="audit" className="data-[state=active]:bg-blue-600">Audit Kontrak</TabsTrigger>
            <TabsTrigger value="ai-chat" className="data-[state=active]:bg-blue-600">Analisis AI</TabsTrigger>
            <TabsTrigger value="demo" className="data-[state=active]:bg-blue-600">Demo Interaktif</TabsTrigger>
          </TabsList>

          <TabsContent value="demo">
            <div className="max-w-6xl mx-auto">
              <InteractiveAuditDemo />
            </div>
          </TabsContent>

          <TabsContent value="ai-chat">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-t-lg">
                    <CardTitle className="text-white flex items-center text-xl">
                      <Code className="mr-3 h-6 w-6" />
                      Kode Kontrak
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Paste kode kontrak Anda di sini untuk analisis AI
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="flex gap-2 mb-4">
                      <Button 
                        onClick={loadSample}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                      >
                        Muat Contoh Kontrak
                      </Button>
                      <Button 
                        onClick={() => setCode('')}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                      >
                        Bersihkan
                      </Button>
                    </div>
                    
                    <Textarea
                      placeholder="pragma solidity ^0.8.0;&#10;&#10;contract MyContract {&#10;    // Kode kontrak Anda di sini&#10;}"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[500px] bg-gray-800/80 border-gray-600 text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </CardContent>
                </Card>

                <AIAnalysisChat contractCode={code} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audit">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Code Input Section */}
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-t-lg">
                  <CardTitle className="text-white flex items-center text-xl">
                    <Code className="mr-3 h-6 w-6" />
                    Kode Smart Contract
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Paste kode kontrak Solidity (.sol) Anda di sini untuk analisis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex gap-2 mb-4">
                    <Button 
                      onClick={loadSample}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                    >
                      Muat Contoh Kontrak
                    </Button>
                    <Button 
                      onClick={() => setCode('')}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                    >
                      Bersihkan
                    </Button>
                  </div>
                  
                  <Textarea
                    placeholder="pragma solidity ^0.8.0;&#10;&#10;contract MyContract {&#10;    // Kode kontrak Anda di sini&#10;    mapping(address => uint256) public balances;&#10;    &#10;    function deposit() public payable {&#10;        balances[msg.sender] += msg.value;&#10;    }&#10;}"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[500px] bg-gray-800/80 border-gray-600 text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <Button 
                    onClick={handleScan}
                    disabled={!code.trim() || isScanning}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-3 font-semibold text-lg transition-all duration-200 hover:scale-105"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Menganalisis Kontrak...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-3 h-5 w-5" />
                        Scan Kontrak
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Results Section */}
              <div className="space-y-6">
                {scanResults && (
                  <>
                    {/* Security Score */}
                    <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
                      <CardHeader className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-t-lg">
                        <CardTitle className="text-white flex items-center justify-between text-xl">
                          <span className="flex items-center">
                            <Activity className="mr-3 h-6 w-6" />
                            Analisis Keamanan
                          </span>
                          <Badge className={`${getScoreColor(scanResults.securityScore)} text-white text-xl px-4 py-2 shadow-lg`}>
                            {scanResults.securityScore}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-6 text-sm">
                          <div className="space-y-2">
                            <span className="text-gray-400">Level Risiko:</span>
                            <span className="text-red-400 font-semibold text-lg block">{scanResults.riskLevel}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400">Total Masalah:</span>
                            <span className="text-white font-semibold text-lg block">{scanResults.totalIssues}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400">Kritis:</span>
                            <span className="text-red-400 font-semibold text-lg block">{scanResults.criticalIssues}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400">Optimasi Gas:</span>
                            <span className="text-white font-semibold text-lg block">{scanResults.gasAnalysis.optimization}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI Summary */}
                    <Alert className="bg-red-900/30 border-red-700/50 shadow-2xl">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <AlertDescription className="text-red-200 leading-relaxed">
                        <strong className="text-red-300">Analisis Keamanan AI:</strong> {scanResults.aiSummary}
                      </AlertDescription>
                    </Alert>

                    {/* Vulnerabilities */}
                    <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
                      <CardHeader>
                        <CardTitle className="text-white text-xl">Kerentanan Terdeteksi</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6 p-6">
                        {scanResults.vulnerabilities.map((vuln, index) => (
                          <div key={index} className="p-5 bg-gray-800/70 rounded-xl border border-gray-600 transition-all duration-300 hover:border-gray-500">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-white font-semibold text-lg">{vuln.type}</h4>
                              <div className="flex items-center gap-3">
                                <Badge variant={getSeverityColor(vuln.severity)} className="text-sm">
                                  {vuln.severity}
                                </Badge>
                                <span className="text-gray-400 text-sm">Baris {vuln.line}</span>
                              </div>
                            </div>
                            <p className="text-gray-300 mb-3 leading-relaxed">{vuln.description}</p>
                            <div className="bg-gray-900/80 p-3 rounded-lg mb-4 border border-gray-700">
                              <code className="text-gray-300 text-sm font-mono">{vuln.codeSnippet}</code>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Dampak:</span>
                                <span className="text-red-400 ml-2">{vuln.impact}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Penggunaan Gas:</span>
                                <span className="text-gray-300 ml-2">{vuln.gasUsed}</span>
                              </div>
                            </div>
                            {vuln.solution && (
                              <div className="mt-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                                <span className="text-green-400 text-sm font-medium">Solusi: </span>
                                <span className="text-green-300 text-sm">{vuln.solution}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Recommendations */}
                    <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
                      <CardHeader className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-t-lg">
                        <CardTitle className="text-white flex items-center text-xl">
                          <CheckCircle className="mr-3 h-6 w-6 text-green-400" />
                          Rekomendasi Keamanan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <ul className="space-y-4">
                          {scanResults.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 leading-relaxed">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Download Reports */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        onClick={() => downloadReport('pdf')}
                        variant="outline" 
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 py-3 transition-all duration-200 hover:scale-105"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button 
                        onClick={() => downloadReport('json')}
                        variant="outline" 
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 py-3 transition-all duration-200 hover:scale-105"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Export JSON
                      </Button>
                    </div>
                  </>
                )}

                {!scanResults && !isScanning && (
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
                    <CardContent className="pt-12 pb-12">
                      <div className="text-center text-gray-400">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                          <Shield className="h-10 w-10 text-gray-500" />
                        </div>
                        <p className="mb-3 text-lg font-medium">Siap menganalisis smart contract Anda</p>
                        <p className="text-sm leading-relaxed max-w-md mx-auto">AI kami akan memindai kerentanan, peluang optimasi gas, dan praktik keamanan terbaik.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {isScanning && (
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
                    <CardContent className="pt-12 pb-12">
                      <div className="text-center text-gray-400">
                        <div className="w-20 h-20 mx-auto mb-6 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
                        </div>
                        <p className="mb-3 text-lg font-medium">Pemindaian mendalam kontrak Anda...</p>
                        <p className="text-sm leading-relaxed max-w-md mx-auto">Menganalisis kerentanan, optimasi gas, dan pola keamanan</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Audit;
