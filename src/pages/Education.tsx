
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, BookOpen, Shield, CheckCircle, X, Lock, Users, TrendingUp, Eye, FileText, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Education = () => {
  const [showPhishingAlert, setShowPhishingAlert] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showQuizResults, setShowQuizResults] = useState(false);

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

  const quizQuestions = [
    {
      question: 'Apa red flag terbesar saat mengevaluasi proyek DeFi?',
      options: [
        'Gas fee yang tinggi',
        'Tim anonim tanpa audit',
        'Proyek baru (kurang dari 1 bulan)',
        'Tokenomics yang kompleks'
      ],
      correct: 1,
      explanation: 'Tim anonim tanpa audit adalah red flag utama karena tidak ada pertanggungjawaban dan transparansi.'
    },
    {
      question: 'Anda menerima email yang meminta "verifikasi wallet" dengan memasukkan seed phrase. Apa yang harus dilakukan?',
      options: [
        'Memasukkan seed phrase untuk verifikasi',
        'Klik link untuk mengecek legitimasi',
        'Hapus email langsung - ini adalah phishing',
        'Forward ke teman untuk pendapat'
      ],
      correct: 2,
      explanation: 'Tidak ada layanan legitimate yang akan meminta seed phrase melalui email. Ini selalu phishing.'
    },
    {
      question: 'Sebelum berinteraksi dengan smart contract baru, Anda harus:',
      options: [
        'Cek apakah sudah diaudit',
        'Baca dokumentasi',
        'Mulai dengan jumlah kecil untuk test',
        'Semua jawaban benar'
      ],
      correct: 3,
      explanation: 'Semua langkah tersebut penting untuk keamanan: audit, dokumentasi, dan testing dengan jumlah kecil.'
    }
  ];

  const simulatePhishing = () => {
    setShowPhishingAlert(true);
    setTimeout(() => setShowPhishingAlert(false), 6000);
  };

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuiz] = answerIndex;
    setQuizAnswers(newAnswers);

    if (currentQuiz < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuiz(currentQuiz + 1), 1000);
    } else {
      setTimeout(() => setShowQuizResults(true), 1000);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correct) {
        correct++;
      }
    });
    return correct;
  };

  const restartQuiz = () => {
    setCurrentQuiz(0);
    setQuizAnswers([]);
    setShowQuizResults(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getSeverityBgColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 border-blue-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      {/* Enhanced Phishing Alert Popup */}
      {showPhishingAlert && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="max-w-md mx-4">
            <Alert className="bg-red-900/90 border-red-600 shadow-2xl animate-scale-in">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <AlertDescription className="text-red-100 text-base leading-relaxed">
                <strong className="text-red-300 text-lg">⚠️ PERINGATAN PHISHING!</strong><br /><br />
                Ini adalah simulasi serangan phishing. Dalam kehidupan nyata, <strong>JANGAN PERNAH</strong> klik link mencurigakan atau masukkan private key di website yang tidak dikenal. 
                <br /><br />
                <strong>Selalu verifikasi URL dan gunakan sumber resmi.</strong>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Edukasi Keamanan Web3
          </h1>
          <p className="text-gray-400 text-lg">Pelajari cara melindungi diri Anda di dunia terdesentralisasi</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Enhanced Scam Token Signs */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-t-lg">
              <CardTitle className="text-white flex items-center text-xl">
                <AlertTriangle className="mr-3 h-6 w-6 text-red-400" />
                Tanda-Tanda Scam Token
              </CardTitle>
              <CardDescription className="text-gray-300">
                Kenali ciri-ciri proyek yang berpotensi penipuan
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {scamSigns.map((sign, index) => (
                  <div key={index} className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${getSeverityBgColor(sign.severity)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                          <sign.icon className="h-5 w-5 text-gray-300" />
                        </div>
                        <h4 className="text-white font-semibold text-lg">{sign.title}</h4>
                      </div>
                      <Badge variant={getSeverityColor(sign.severity)} className="text-xs">
                        {sign.severity === 'high' ? 'Tinggi' : sign.severity === 'medium' ? 'Sedang' : 'Rendah'}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed ml-13">{sign.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Security Tips */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-t-lg">
              <CardTitle className="text-white flex items-center text-xl">
                <Shield className="mr-3 h-6 w-6 text-green-400" />
                Tips Keamanan Web3
              </CardTitle>
              <CardDescription className="text-gray-300">
                Panduan penting untuk menjaga keamanan crypto Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {securityTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Phishing Simulation */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-t-lg">
              <CardTitle className="text-white text-xl">Simulasi Phishing</CardTitle>
              <CardDescription className="text-gray-300">
                Rasakan bagaimana serangan phishing terlihat
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="p-5 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-xl">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📧</span>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm font-medium">From: security@uniswap-verify.com</p>
                      <p className="text-blue-300 text-xs">Subject: URGENT: Verifikasi Wallet Segera</p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      "Wallet Anda telah ditandai karena aktivitas mencurigakan. Klik di sini untuk memverifikasi wallet dan mencegah pembekuan akun."
                    </p>
                    <p className="text-red-300 text-xs italic">
                      🚨 Klik tombol akan menunjukkan peringatan (simulasi aman)
                    </p>
                  </div>
                  <Button 
                    onClick={simulatePhishing}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    Verifikasi Wallet Sekarang (LINK PALSU - DEMO)
                  </Button>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-xl">
                  <p className="text-yellow-200 text-xs leading-relaxed">
                    ⚠️ Ini adalah simulasi yang aman. Klik akan menampilkan peringatan untuk menunjukkan apa yang terjadi pada serangan phishing asli.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Security Quiz */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-t-lg">
              <CardTitle className="text-white flex items-center text-xl">
                <BookOpen className="mr-3 h-6 w-6 text-purple-400" />
                Quiz Keamanan Web3
              </CardTitle>
              <CardDescription className="text-gray-300">
                Uji pengetahuan keamanan Web3 Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {!showQuizResults ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-300 font-medium">Soal {currentQuiz + 1} dari {quizQuestions.length}</span>
                    <div className="w-32 bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                    <h4 className="text-white font-semibold text-lg mb-6 leading-relaxed">
                      {quizQuestions[currentQuiz].question}
                    </h4>
                    
                    <div className="space-y-3">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full text-left justify-start border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500 py-4 px-5 rounded-xl transition-all duration-200 hover:scale-105"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-4 text-sm font-medium">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-sm leading-relaxed">{option}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="text-8xl mb-6">
                    {calculateScore() === quizQuestions.length ? '🎉' : calculateScore() >= 2 ? '👍' : '📚'}
                  </div>
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <h4 className="text-white text-2xl font-bold mb-3">
                      Quiz Selesai!
                    </h4>
                    <p className="text-gray-300 text-lg mb-4">
                      Skor Anda: <span className="text-blue-400 font-bold">{calculateScore()}</span> dari <span className="text-gray-400">{quizQuestions.length}</span>
                    </p>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      {calculateScore() === quizQuestions.length 
                        ? "Sempurna! Anda sudah siap untuk keamanan Web3."
                        : calculateScore() >= 2 
                        ? "Bagus! Terus belajar untuk meningkatkan keamanan."
                        : "Pertimbangkan untuk meninjau kembali tips keamanan di atas."}
                    </p>
                  </div>
                  <Button 
                    onClick={restartQuiz} 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                  >
                    Ulangi Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Education;
