
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Shield, AlertTriangle, CheckCircle, Code, Zap } from 'lucide-react';
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

  const handleAudit = async () => {
    if (!contractCode.trim() || !contractName.trim() || !user) return;

    setIsAuditing(true);
    setAuditResult(null);

    try {
      // Call Gemini AI for analysis
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('gemini-analysis', {
        body: {
          prompt: 'Lakukan audit keamanan komprehensif pada smart contract ini dan berikan score A-F',
          contractCode: contractCode
        }
      });

      if (aiError) throw aiError;

      // Generate audit score based on AI analysis
      const vulnerabilityKeywords = ['vulnerability', 'kerentanan', 'risk', 'exploit', 'attack'];
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

      setAuditResult(result);

      // Save to database
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
        title: "Audit Selesai",
        description: `Smart contract ${contractName} berhasil diaudit dengan score ${score}`,
      });

    } catch (error) {
      console.error('Error during audit:', error);
      toast({
        title: "Error",
        description: "Gagal melakukan audit smart contract",
        variant: "destructive",
      });
    } finally {
      setIsAuditing(false);
    }
  };

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-yellow-500';
      case 'C': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Passed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'Warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'Failed': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: return <Shield className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-400" />
          Smart Contract Audit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Contract Name
            </label>
            <input
              type="text"
              placeholder="Enter contract name"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Smart Contract Code
            </label>
            <Textarea
              placeholder="Paste your Solidity contract code here..."
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
              className="bg-gray-900 border-gray-600 text-gray-100 min-h-[200px] font-mono text-sm"
            />
          </div>
          
          <Button 
            onClick={handleAudit}
            disabled={isAuditing || !contractCode.trim() || !contractName.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isAuditing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Mengaudit dengan AI...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Audit Smart Contract
              </>
            )}
          </Button>
        </div>

        {auditResult && (
          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Hasil Audit</h3>
              <div className="flex items-center space-x-2">
                {getStatusIcon(auditResult.status)}
                <Badge className={`${getScoreColor(auditResult.score)} text-white`}>
                  Score: {auditResult.score}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-800 rounded">
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-white font-semibold">{auditResult.status}</p>
              </div>
              <div className="text-center p-3 bg-gray-800 rounded">
                <p className="text-gray-400 text-sm">Kerentanan</p>
                <p className="text-white font-semibold">{auditResult.vulnerabilities}</p>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-400 text-sm mb-2">Analisis AI:</p>
              <div className="text-gray-200 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
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
