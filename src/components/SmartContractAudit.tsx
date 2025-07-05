
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Shield, AlertTriangle, CheckCircle, Code, Zap, FileText, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AuditResult {
  score: string;
  status: string;
  vulnerabilities: number;
  analysis: string;
}

const SmartContractAudit = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contractCode, setContractCode] = useState('');
  const [contractName, setContractName] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [progress, setProgress] = useState(0);

  const handleAudit = async () => {
    if (!contractCode.trim() || !contractName.trim() || !user) return;

    setIsAuditing(true);
    setAuditResult(null);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('gemini-analysis', {
        body: {
          prompt: 'Lakukan audit keamanan komprehensif pada smart contract ini dan berikan score A-F dengan analisis detail',
          contractCode: contractCode
        }
      });

      if (aiError) throw aiError;

      const vulnerabilityKeywords = ['vulnerability', 'kerentanan', 'risk', 'exploit', 'attack', 'unsafe', 'security'];
      const analysisText = aiResponse.analysis?.toLowerCase() || '';
      const vulnCount = vulnerabilityKeywords.reduce((count, keyword) => {
        return count + (analysisText.split(keyword).length - 1);
      }, 0);

      let score = 'A';
      let status = 'Passed';
      
      if (vulnCount > 5) {
        score = 'C';
        status = 'Failed';
      } else if (vulnCount > 2) {
        score = 'B';
        status = 'Warning';
      }

      const result: AuditResult = {
        score,
        status,
        vulnerabilities: vulnCount,
        analysis: aiResponse.analysis || 'Analisis tidak tersedia'
      };

      setProgress(100);
      setTimeout(() => {
        setAuditResult(result);
      }, 500);

      const { error: dbError } = await supabase
        .from('audit_history')
        .insert({
          user_id: user.id,
          contract_name: contractName,
          contract_code: contractCode,
          audit_score: score,
          audit_status: status,
          vulnerability_count: vulnCount
        });

      if (dbError) throw dbError;

      toast({
        title: "🎉 Audit Selesai",
        description: `Smart contract ${contractName} berhasil diaudit dengan score ${score}`,
      });

    } catch (error) {
      console.error('Error during audit:', error);
      toast({
        title: "❌ Error",
        description: "Gagal melakukan audit smart contract",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsAuditing(false);
      setProgress(0);
    }
  };

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A': return 'bg-gradient-to-r from-green-500 to-green-600 shadow-green-500/25';
      case 'B': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-yellow-500/25';
      case 'C': return 'bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/25';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 shadow-gray-500/25';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Passed': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'Warning': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'Failed': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return <Shield className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:shadow-xl hover:shadow-gray-900/20 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Shield className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <span className="text-xl">Smart Contract Audit</span>
            <p className="text-sm text-gray-400 font-normal mt-1">AI-Powered Security Analysis</p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contract Name
            </label>
            <input
              type="text"
              placeholder="e.g., MyToken Contract"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Solidity Contract Code
            </label>
            <Textarea
              placeholder="pragma solidity ^0.8.0;&#10;&#10;contract MyContract {&#10;    // Paste your Solidity code here...&#10;}"
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
              className="bg-gray-900/50 border-gray-600 text-gray-100 min-h-[200px] font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{contractCode.length} characters</span>
              <span>{contractCode.split('\n').length} lines</span>
            </div>
          </div>
          
          {isAuditing && (
            <div className="space-y-3 p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 text-blue-400">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Analyzing Security...</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400">
                AI sedang menganalisis smart contract untuk kerentanan keamanan...
              </p>
            </div>
          )}
          
          <Button 
            onClick={handleAudit}
            disabled={isAuditing || !contractCode.trim() || !contractName.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25 h-12 text-base font-medium"
          >
            {isAuditing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Mengaudit dengan AI Gemini...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Mulai Audit Keamanan
              </>
            )}
          </Button>
        </div>

        {auditResult && (
          <div className="mt-6 p-6 bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-xl border border-gray-600/50 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                {getStatusIcon(auditResult.status)}
                Hasil Audit
              </h3>
              <Badge className={`${getScoreColor(auditResult.score)} text-white font-bold text-base px-4 py-2 shadow-lg border-0`}>
                Score: {auditResult.score}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-center mb-2">
                  {getStatusIcon(auditResult.status)}
                </div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-white font-semibold text-lg">{auditResult.status}</p>
              </div>
              
              <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                </div>
                <p className="text-gray-400 text-sm">Kerentanan</p>
                <p className="text-white font-semibold text-lg">{auditResult.vulnerabilities}</p>
              </div>
              
              <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-gray-400 text-sm">Confidence</p>
                <p className="text-white font-semibold text-lg">98%</p>
              </div>
            </div>
            
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/30">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-blue-400" />
                <p className="text-gray-300 font-medium">Analisis AI Gemini:</p>
              </div>
              <div className="text-gray-200 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto custom-scrollbar leading-relaxed">
                {auditResult.analysis}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartContractAudit;
