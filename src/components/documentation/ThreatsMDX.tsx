
import React from 'react';
import { AlertTriangle, Globe, Code, Users } from 'lucide-react';

const ThreatsMDX = () => {
  const threats = [
    {
      icon: Globe,
      title: 'Phishing Attacks',
      description: 'Website atau email palsu yang meniru platform legitimate',
      tips: [
        'Selalu periksa URL dengan teliti',
        'Bookmark website resmi',
        'Jangan klik link dari email atau pesan',
        'Verifikasi certificate SSL website'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Rug Pull',
      description: 'Developer menguras liquidity pool dan melarikan diri',
      tips: [
        'Periksa audit smart contract',
        'Cek locked liquidity',
        'Analisis tokenomics',
        'Verifikasi tim developer'
      ]
    },
    {
      icon: Code,
      title: 'Smart Contract Exploits',
      description: 'Bug dalam smart contract yang dieksploitasi',
      tips: [
        'Reentrancy attacks',
        'Integer overflow/underflow',
        'Flash loan attacks',
        'Oracle manipulation'
      ]
    },
    {
      icon: Users,
      title: 'Social Engineering',
      description: 'Manipulasi psikologis untuk mendapatkan informasi',
      tips: [
        'Fake customer support',
        'Impersonation di social media',
        'Fake giveaways/airdrops',
        'Romance scams'
      ]
    }
  ];

  return (
    <div className="prose prose-invert max-w-none">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="h-6 w-6 text-red-400" />
        <h1 className="text-2xl md:text-3xl font-bold text-white m-0">
          Ancaman dan Serangan Umum
        </h1>
      </div>

      <div className="space-y-6">
        {threats.map((threat, index) => (
          <section key={index} className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 p-4 md:p-6 rounded-lg hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-start gap-3 mb-3">
              <threat.icon className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
              <h2 className="text-lg md:text-xl font-semibold text-red-400 m-0">
                {threat.title}
              </h2>
            </div>
            <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed m-0">
              {threat.description}:
            </p>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm md:text-base pl-4">
              {threat.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ThreatsMDX;
