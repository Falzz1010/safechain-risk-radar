
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

const InteractiveAuditDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const auditSteps = [
    { name: 'Contract Parsing', status: 'pending', icon: Clock },
    { name: 'Syntax Analysis', status: 'pending', icon: CheckCircle },
    { name: 'Security Patterns', status: 'pending', icon: AlertTriangle },
    { name: 'AI Risk Assessment', status: 'pending', icon: Zap },
  ];

  const vulnerabilities = [
    {
      type: 'Reentrancy Attack',
      severity: 'Critical',
      line: 42,
      description: 'External call before state update in withdraw function',
      impact: 'Funds can be drained from contract',
      recommendation: 'Use checks-effects-interactions pattern'
    },
    {
      type: 'Integer Overflow',
      severity: 'High',
      line: 28,
      description: 'Unchecked arithmetic operations',
      impact: 'Token balance manipulation possible',
      recommendation: 'Use SafeMath library or Solidity 0.8+'
    },
    {
      type: 'Access Control',
      severity: 'Medium',
      line: 15,
      description: 'Missing onlyOwner modifier on critical function',
      impact: 'Unauthorized access to admin functions',
      recommendation: 'Add proper access control modifiers'
    }
  ];

  const startDemo = () => {
    setIsScanning(true);
    setScanProgress(0);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Update steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= auditSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
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

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Interactive Audit Demo</CardTitle>
        <CardDescription className="text-gray-400">
          See how our AI audit system works in real-time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isScanning && scanProgress === 0 ? (
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Click below to see a live demonstration of our smart contract audit process
            </p>
            <Button onClick={startDemo} className="bg-blue-600 hover:bg-blue-700">
              Start Audit Demo
            </Button>
          </div>
        ) : (
          <>
            {/* Progress Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Audit Progress</span>
                <span className="text-gray-400">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>

            {/* Steps Section */}
            <div className="space-y-3">
              {auditSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= currentStep;
                const isCompleted = index < currentStep || (!isScanning && scanProgress === 100);
                
                return (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive ? 'bg-blue-900/20 border border-blue-700' : 'bg-gray-900/50'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      isCompleted ? 'text-green-500' : isActive ? 'text-blue-400' : 'text-gray-500'
                    }`} />
                    <span className={`${
                      isCompleted ? 'text-green-400' : isActive ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                    {isCompleted && <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />}
                    {isActive && !isCompleted && <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin ml-auto" />}
                  </div>
                );
              })}
            </div>

            {/* Results Section */}
            {scanProgress === 100 && (
              <div className="space-y-4 border-t border-gray-600 pt-6">
                <h4 className="text-white font-medium">Vulnerabilities Found</h4>
                <div className="space-y-3">
                  {vulnerabilities.map((vuln, index) => (
                    <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-white font-medium">{vuln.type}</h5>
                        <div className="flex items-center gap-2">
                          <Badge variant={getSeverityColor(vuln.severity)}>
                            {vuln.severity}
                          </Badge>
                          <span className="text-gray-400 text-sm">Line {vuln.line}</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{vuln.description}</p>
                      <div className="text-xs text-gray-500">
                        <strong>Impact:</strong> {vuln.impact}
                      </div>
                      <div className="text-xs text-blue-400 mt-1">
                        <strong>Fix:</strong> {vuln.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => {
                    setCurrentStep(0);
                    setScanProgress(0);
                  }}
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Run Demo Again
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveAuditDemo;
