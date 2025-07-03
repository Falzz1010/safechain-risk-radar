
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Search, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: 'Audit Otomatis',
      description: 'Analisis smart contract secara otomatis untuk mendeteksi kerentanan keamanan'
    },
    {
      icon: Zap,
      title: 'AI Analisis',
      description: 'Powered by AI untuk memberikan insight mendalam tentang risiko keamanan'
    },
    {
      icon: Search,
      title: 'Token Scanner',
      description: 'Scan token dan wallet untuk mendeteksi aktivitas mencurigakan'
    },
    {
      icon: BookOpen,
      title: 'Edukasi Web3',
      description: 'Pelajari cara melindungi diri dari scam dan phishing di Web3'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            SafeChain
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Secure the Chain, Protect the User
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link to="/audit">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg">
                Smart Contract Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/analyzer">
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 text-lg">
                Wallet Risk Analyzer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <feature.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
