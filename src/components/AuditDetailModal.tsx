import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  Code, 
  FileText, 
  Download,
  Copy,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getScoreColor, formatDate } from '@/lib/utils';

interface AuditRecord {
  id: string;
  contract_name: string;
  audit_score: string;
  audit_status: string;
  created_at: string;
  vulnerability_count?: number;
  contract_code?: string;
}

interface AuditDetailModalProps {
  audit: AuditRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

const AuditDetailModal: React.FC<AuditDetailModalProps> = ({ audit, isOpen, onClose }) => {
  const { toast } = useToast();

  if (!audit) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Passed': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'Warning': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'Failed': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return <Shield className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleCopyCode = () => {
    if (audit.contract_code) {
      navigator.clipboard.writeText(audit.contract_code);
      toast({
        title: "✅ Berhasil",
        description: "Kode contract berhasil disalin",
      });
    }
  };

  const handleDownloadReport = () => {
    const reportContent = `
AUDIT REPORT
============

Contract Name: ${audit.contract_name}
Audit Date: ${formatDate(audit.created_at, 'id-ID', { month: 'long' })}
Score: ${audit.audit_score}
Status: ${audit.audit_status}
Vulnerabilities Found: ${audit.vulnerability_count || 0}

Contract Code:
${audit.contract_code || 'N/A'}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-report-${audit.contract_name}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "📥 Download Selesai",
      description: "Laporan audit berhasil didownload",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
        <DialogHeader className="pb-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              Detail Audit Smart Contract
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Informasi Contract
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Nama Contract</p>
                  <p className="text-white font-semibold">{audit.contract_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tanggal Audit</p>
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {formatDate(audit.created_at, 'id-ID', { month: 'long' })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Hasil Audit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Score</span>
                  <Badge className={`${getScoreColor(audit.audit_score)} text-white font-bold text-lg px-3 py-1`}>
                    {audit.audit_score}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Status</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(audit.audit_status)}
                    <span className="text-white font-semibold">{audit.audit_status}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Kerentanan</span>
                  <span className="text-white font-semibold">{audit.vulnerability_count || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleDownloadReport}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Laporan
            </Button>
            
            {audit.contract_code && (
              <Button 
                onClick={handleCopyCode}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Kode Contract
              </Button>
            )}
          </div>

          {/* Contract Code */}
          {audit.contract_code && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-400" />
                  Kode Smart Contract
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/80 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                    {audit.contract_code}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuditDetailModal;
