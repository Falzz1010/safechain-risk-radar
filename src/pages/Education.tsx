
import React, { useState, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, BookOpen, Shield, CheckCircle, TrendingUp, Users, Lock, Eye, FileText, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Memoized components untuk performa
const ScamSignCard = memo(({ sign, index }: { sign: any; index: number }) => {
  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 border-red-500/20 hover:border-red-500/40';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/40';
      case 'low': return 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40';
      default: return 'bg-gray-500/10 border-gray-500/20 hover:border-gray-500/40';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${getSeverityBgColor(sign.severity)}`}>
      <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
        <div className="flex items-center flex-1 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <sign.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
          </div>
          <h4 className="text-white font-semibold text-sm sm:text-lg leading-tight truncate">{sign.title}</h4>
        </div>
        <Badge variant={getSeverityColor(sign.severity)} className="text-xs flex-shrink-0">
          {sign.severity === 'high' ? 'Tinggi' : sign.severity === 'medium' ? 'Sedang' : 'Rendah'}
        </Badge>
      </div>
      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed ml-10 sm:ml-13">{sign.description}</p>
    </div>
  );
});

const SecurityTipItem = memo(({ tip, index }: { tip: string; index: number }) => (
  <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200">
    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
    </div>
    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{tip}</p>
  </div>
));

const Education = () => {
  const [showPhishingAlert, setShowPhishingAlert] = useState(false);

  const scamSigns = [
    {
      title: 'Imbal Hasil Tidak Realistis',
      description: 'Menjanjikan keuntungan tinggi yang terjamin (>100% APY) tanpa risiko apapun',
      severity: 'high',
      icon: TrendingUp
    },
    {
      title: 'Tim Anonim',
      description: 'Tidak ada informasi tim, profil palsu, atau foto tim yang dicopy-paste',
      severity: 'high',
      icon: Users
    },
    {
      title: 'Tidak Ada Liquidity Lock',
      description: 'Developer dapat menarik likuiditas kapan saja (risiko rug pull)',
      severity: 'high',
      icon: Lock
    },
    {
      title: 'Kontrak Honeypot',
      description: 'Anda bisa membeli token tetapi tidak bisa menjualnya',
      severity: 'medium',
      icon: Eye
    },
    {
      title: 'Tidak Ada Laporan Audit',
      description: 'Smart contract belum diaudit oleh firma audit terpercaya',
      severity: 'medium',
      icon: FileText
    },
    {
      title: 'Fokus Marketing Berlebihan',
      description: 'Lebih fokus pada hype dan marketing daripada pengembangan produk',
      severity: 'low',
      icon: Zap
    }
  ];

  const securityTips = [
    'Jangan pernah bagikan private key atau seed phrase kepada siapapun',
    'Selalu verifikasi alamat kontrak di website resmi',
    'Gunakan hardware wallet untuk jumlah yang besar',
    'Aktifkan 2FA di semua exchange crypto',
    'Hati-hati dengan airdrop dan penawaran token gratis',
    'Periksa URL website untuk typo (phishing)',
    'Riset proyek secara menyeluruh sebelum berinvestasi',
    'Mulai dengan jumlah kecil saat mencoba protokol baru',
    'Gunakan wallet terpisah untuk DeFi dan NFT',
    'Selalu backup seed phrase di tempat yang aman'
  ];

  const simulatePhishing = () => {
    setShowPhishingAlert(true);
    setTimeout(() => setShowPhishingAlert(false), 6000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      {/* Enhanced Phishing Alert Popup */}
      {showPhishingAlert && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="max-w-md w-full">
            <Alert className="bg-red-900/90 border-red-600 shadow-2xl animate-scale-in">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
              <AlertDescription className="text-red-100 text-sm sm:text-base leading-relaxed">
                <strong className="text-red-300 text-base sm:text-lg">⚠️ PERINGATAN PHISHING!</strong><br /><br />
                Ini adalah simulasi serangan phishing. Dalam kehidupan nyata, <strong>JANGAN PERNAH</strong> klik link mencurigakan atau masukkan private key di website yang tidak dikenal. 
                <br /><br />
                <strong>Selalu verifikasi URL dan gunakan sumber resmi.</strong>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-3 sm:px-4 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent px-2">
            Edukasi Keamanan Web3
          </h1>
          <p className="text-gray-400 text-base sm:text-lg px-2">Pelajari cara melindungi diri Anda di dunia terdesentralisasi</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Enhanced Scam Token Signs */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-t-lg p-4 sm:p-6">
              <CardTitle className="text-white flex items-center text-lg sm:text-xl">
                <AlertTriangle className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-red-400 flex-shrink-0" />
                <span className="truncate">Tanda-Tanda Scam Token</span>
              </CardTitle>
              <CardDescription className="text-gray-300 text-sm sm:text-base">
                Kenali ciri-ciri proyek yang berpotensi penipuan
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                {scamSigns.map((sign, index) => (
                  <ScamSignCard key={index} sign={sign} index={index} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Security Tips */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-t-lg p-4 sm:p-6">
              <CardTitle className="text-white flex items-center text-lg sm:text-xl">
                <Shield className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-green-400 flex-shrink-0" />
                <span className="truncate">Tips Keamanan Web3</span>
              </CardTitle>
              <CardDescription className="text-gray-300 text-sm sm:text-base">
                Panduan penting untuk menjaga keamanan crypto Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {securityTips.map((tip, index) => (
                  <SecurityTipItem key={index} tip={tip} index={index} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Enhanced Phishing Simulation */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-t-lg p-4 sm:p-6">
              <CardTitle className="text-white text-lg sm:text-xl">Simulasi Phishing</CardTitle>
              <CardDescription className="text-gray-300 text-sm sm:text-base">
                Rasakan bagaimana serangan phishing terlihat
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-xl">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm">📧</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-blue-200 text-xs sm:text-sm font-medium truncate">From: security@uniswap-verify.com</p>
                      <p className="text-blue-300 text-xs truncate">Subject: URGENT: Verifikasi Wallet Segera</p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                    <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                      "Wallet Anda telah ditandai karena aktivitas mencurigakan. Klik di sini untuk memverifikasi wallet dan mencegah pembekuan akun."
                    </p>
                    <p className="text-red-300 text-xs italic">
                      🚨 Klik tombol akan menunjukkan peringatan (simulasi aman)
                    </p>
                  </div>
                  <Button 
                    onClick={simulatePhishing}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 sm:py-3 rounded-xl transition-all duration-200 hover:scale-105 text-sm sm:text-base"
                  >
                    Verifikasi Wallet Sekarang (LINK PALSU - DEMO)
                  </Button>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-700/50 p-3 sm:p-4 rounded-xl">
                  <p className="text-yellow-200 text-xs leading-relaxed">
                    ⚠️ Ini adalah simulasi yang aman. Klik akan menampilkan peringatan untuk menunjukkan apa yang terjadi pada serangan phishing asli.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Quiz */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-t-lg p-4 sm:p-6">
              <CardTitle className="text-white flex items-center text-lg sm:text-xl">
                <BookOpen className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-purple-400 flex-shrink-0" />
                <span className="truncate">Quiz Keamanan Web3</span>
              </CardTitle>
              <CardDescription className="text-gray-300 text-sm sm:text-base">
                Uji pengetahuan keamanan Web3 Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="text-center space-y-4">
                <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-sm mb-4">
                    Quiz interaktif untuk menguji pemahaman Anda tentang keamanan Web3 akan segera tersedia.
                  </p>
                  <p className="text-gray-400 text-xs">
                    Fitur ini sedang dalam pengembangan untuk memberikan pengalaman belajar yang lebih interaktif.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Education;
