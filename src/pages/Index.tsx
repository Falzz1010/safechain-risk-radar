
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Search, BookOpen, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: 'Audit Otomatis',
      description: 'Analisis smart contract secara otomatis untuk mendeteksi kerentanan keamanan dengan AI canggih'
    },
    {
      icon: Zap,
      title: 'AI Analisis',
      description: 'Powered by AI Gemini untuk memberikan insight mendalam tentang risiko keamanan dan rekomendasi'
    },
    {
      icon: Search,
      title: 'Token Scanner',
      description: 'Scan token dan wallet untuk mendeteksi aktivitas mencurigakan, rug pull, dan honeypot'
    },
    {
      icon: BookOpen,
      title: 'Edukasi Web3',
      description: 'Pelajari cara melindungi diri dari scam, phishing, dan berbagai ancaman di ekosistem Web3'
    }
  ];

  const stats = [
    { icon: Shield, value: '10,000+', label: 'Smart Contracts Diaudit' },
    { icon: Users, value: '5,000+', label: 'Pengguna Aktif' },
    { icon: TrendingUp, value: '99.9%', label: 'Akurasi Deteksi' },
    { icon: Star, value: '4.9/5', label: 'Rating Pengguna' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-16">
          <div className="mb-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
              SafeChain
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6 rounded-full"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Secure the Chain, Protect the User
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Platform keamanan Web3 terdepan dengan teknologi AI untuk melindungi aset digital Anda dari berbagai ancaman cyber
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/audit">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Smart Contract Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/analyzer">
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Wallet Risk Analyzer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Teknologi keamanan terdepan untuk melindungi investasi crypto dan DeFi Anda
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105 hover:border-blue-500/30 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-blue-400 group-hover:text-blue-300" />
                  </div>
                  <CardTitle className="text-white text-lg group-hover:text-blue-300 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-400 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Mulai Lindungi Aset Digital Anda Hari Ini
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang telah mempercayai SafeChain untuk keamanan Web3 mereka
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/education">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3">
                Pelajari Keamanan Web3
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-3">
                Lihat Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
