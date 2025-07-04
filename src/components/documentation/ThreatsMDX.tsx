
import React from 'react';
import { AlertTriangle, Globe, Code, Users } from 'lucide-react';

const ThreatsMDX = () => {
  const threats = [
    {
      icon: Globe,
      title: 'Phishing Attacks',
      description: 'Website atau email palsu yang meniru platform legitimate:',
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
      description: 'Developer menguras liquidity pool dan melarikan diri:',
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
      description: 'Bug dalam smart contract yang dieksploitasi:',
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
      description: 'Manipulasi psikologis untuk mendapatkan informasi:',
      tips: [
        'Fake customer support',
        'Impersonation di social media',
        'Fake giveaways/airdrops',
        'Romance scams'
      ]
    }
  ];

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center space-x-3 mb-6">
        <AlertTriangle className="h-6 w-6 text-red-400" />
        <h3 className="text-xl font-semibold">Ancaman dan Serangan Umum</h3>
      </div>

      <div className="grid gap-4 md:gap-6">
        {threats.map((threat, index) => (
          <div key={index} className="bg-red-900/20 border border-red-500/20 p-4 md:p-6 rounded-lg hover:border-red-500/40 transition-all duration-300">
            <div className="flex items-start space-x-3 mb-3">
              <threat.icon className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
              <h4 className="font-semibold text-red-400 text-sm md:text-base">{threat.title}</h4>
            </div>
            <p className="text-gray-300 mb-3 text-sm md:text-base">{threat.description}</p>
            <ul className="text-gray-300 space-y-1 list-disc list-inside text-sm">
              {threat.tips.map((tip, tipIndex) => (
                <li key={tipIndex}>{tip}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatsMDX;
