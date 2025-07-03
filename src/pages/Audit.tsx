import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Shield, AlertTriangle, CheckCircle, Code, FileText, Bot } from 'lucide-react';
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
    
    // Simulate realistic scanning process
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
            description: 'External call before state update in withdraw function allows reentrancy attacks',
            impact: 'Attacker can drain contract funds',
            gasUsed: 'High',
            codeSnippet: 'msg.sender.call{value: amount}("");'
          },
          { 
            type: 'Integer Overflow', 
            severity: 'High', 
            line: 8,
            description: 'Unchecked arithmetic operations can lead to integer overflow',
            impact: 'Token balance manipulation possible',
            gasUsed: 'Medium',
            codeSnippet: 'balances[msg.sender] += msg.value;'
          },
          { 
            type: 'Access Control', 
            severity: 'Medium', 
            line: 12,
            description: 'No access control on withdraw function',
            impact: 'Anyone can attempt to withdraw',
            gasUsed: 'Low',
            codeSnippet: 'function withdraw(uint256 amount) public'
          },
          { 
            type: 'Gas Limit', 
            severity: 'Low', 
            line: 15,
            description: 'External call without gas limit specification',
            impact: 'Potential out-of-gas errors',
            gasUsed: 'Variable',
            codeSnippet: 'msg.sender.call{value: amount}("");'
          },
          { 
            type: 'Event Logging', 
            severity: 'Low', 
            line: 0,
            description: 'Missing event emissions for state changes',
            impact: 'Poor transparency and monitoring',
            gasUsed: 'Low',
            codeSnippet: 'No events defined'
          }
        ],
        aiSummary: 'This contract contains critical security vulnerabilities that make it highly susceptible to reentrancy attacks. The withdraw function allows external calls before updating the internal state, which is a classic reentrancy vulnerability. Immediate fixes are required before deployment.',
        recommendations: [
          'Implement checks-effects-interactions pattern',
          'Use ReentrancyGuard from OpenZeppelin',
          'Add comprehensive access controls',
          'Implement proper event logging',
          'Consider using pull payment pattern'
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Smart Contract Security Audit</h1>
          <p className="text-gray-400">Advanced AI-powered vulnerability detection for Solidity contracts</p>
        </div>

        <Tabs defaultValue="audit" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="audit">Contract Audit</TabsTrigger>
            <TabsTrigger value="ai-chat">AI Analysis</TabsTrigger>
            <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="demo">
            <div className="max-w-4xl mx-auto">
              <InteractiveAuditDemo />
            </div>
          </TabsContent>

          <TabsContent value="ai-chat">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Code className="mr-2 h-5 w-5" />
                      Contract Code
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Paste your contract code here for AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2 mb-4">
                      <Button 
                        onClick={loadSample}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Load Sample Contract
                      </Button>
                      <Button 
                        onClick={() => setCode('')}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Clear
                      </Button>
                    </div>
                    
                    <Textarea
                      placeholder="pragma solidity ^0.8.0;&#10;&#10;contract MyContract {&#10;    // Your contract code here&#10;}"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[400px] bg-gray-900 border-gray-600 text-gray-100 font-mono text-sm"
                    />
                  </CardContent>
                </Card>

                <AIAnalysisChat contractCode={code} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audit">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Code Input Section */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Code className="mr-2 h-5 w-5" />
                    Smart Contract Code
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Paste your Solidity (.sol) contract code here for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button 
                      onClick={loadSample}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Load Sample Contract
                    </Button>
                    <Button 
                      onClick={() => setCode('')}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Clear
                    </Button>
                  </div>
                  
                  <Textarea
                    placeholder="pragma solidity ^0.8.0;&#10;&#10;contract MyContract {&#10;    // Your contract code here&#10;    mapping(address => uint256) public balances;&#10;    &#10;    function deposit() public payable {&#10;        balances[msg.sender] += msg.value;&#10;    }&#10;}"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[400px] bg-gray-900 border-gray-600 text-gray-100 font-mono text-sm"
                  />
                  
                  <Button 
                    onClick={handleScan}
                    disabled={!code.trim() || isScanning}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing Contract...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Scan Contract
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
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center justify-between">
                          <span>Security Analysis</span>
                          <Badge className={`${getScoreColor(scanResults.securityScore)} text-white text-lg px-3 py-1`}>
                            {scanResults.securityScore}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Risk Level:</span>
                            <span className="text-red-400 font-medium ml-2">{scanResults.riskLevel}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Total Issues:</span>
                            <span className="text-white font-medium ml-2">{scanResults.totalIssues}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Critical:</span>
                            <span className="text-red-400 font-medium ml-2">{scanResults.criticalIssues}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Gas Usage:</span>
                            <span className="text-white font-medium ml-2">{scanResults.gasAnalysis.optimization}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI Summary */}
                    <Alert className="bg-red-900/20 border-red-700">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-red-200">
                        <strong>AI Security Analysis:</strong> {scanResults.aiSummary}
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
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-white font-medium">{vuln.type}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant={getSeverityColor(vuln.severity)}>
                                  {vuln.severity}
                                </Badge>
                                <span className="text-gray-400 text-sm">Line {vuln.line}</span>
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{vuln.description}</p>
                            <div className="bg-gray-800 p-2 rounded text-xs font-mono text-gray-300 mb-2">
                              {vuln.codeSnippet}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="text-gray-500">Impact:</span>
                                <span className="text-red-400 ml-1">{vuln.impact}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Gas Usage:</span>
                                <span className="text-gray-300 ml-1">{vuln.gasUsed}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Recommendations */}
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          Security Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {scanResults.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{rec}</span>
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
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button 
                        onClick={() => downloadReport('json')}
                        variant="outline" 
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Export JSON
                      </Button>
                    </div>
                  </>
                )}

                {!scanResults && !isScanning && (
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="text-center text-gray-400">
                        <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="mb-2">Ready to analyze your smart contract</p>
                        <p className="text-sm">Our AI will scan for vulnerabilities, gas optimization opportunities, and security best practices.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {isScanning && (
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="text-center text-gray-400">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
                        <p className="mb-2">Deep scanning your contract...</p>
                        <p className="text-sm">Analyzing for vulnerabilities, gas optimization, and security patterns</p>
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
