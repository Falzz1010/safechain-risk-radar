
import React from 'react';
import { Shield, Smartphone, ArrowRightLeft, TrendingUp, AlertCircle, Wrench } from 'lucide-react';

const BestPracticesMDX = () => {
  const practices = [
    {
      icon: Smartphone,
      title: 'Wallet Security',
      color: 'blue',
      tips: [
        'Gunakan hardware wallet untuk aset besar',
        'Aktifkan 2FA di semua akun',
        'Gunakan wallet terpisah untuk trading dan hodling',
        'Update wallet software secara rutin',
        'Test recovery process secara berkala'
      ]
    },
    {
      icon: ArrowRightLeft,
      title: 'Transaction Safety',
      color: 'green',
      tips: [
        'Double-check alamat penerima',
        'Mulai dengan jumlah kecil untuk test',
        'Periksa gas fees sebelum confirm',
        'Gunakan reputable DEX dan CEX',
        'Set slippage tolerance yang wajar'
      ]
    },
    {
      icon: TrendingUp,
      title: 'DeFi Safety',
      color: 'purple',
      tips: [
        'Audit protocol sebelum invest',
        'Diversifikasi risiko',
        'Pahami impermanent loss',
        'Monitor yield farming rewards',
        'Revoke unused token approvals'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Emergency Response',
      color: 'red',
      tips: [
        'Siapkan emergency recovery plan',
        'Backup semua data penting',
        'Simpan recovery phrase di multiple locations',
        'Dokumentasikan semua wallet addresses',
        'Update security measures secara berkala'
      ]
    }
  ];

  const tools = [
    { category: 'Hardware Wallets', items: 'Ledger, Trezor' },
    { category: 'Portfolio Trackers', items: 'DeBank, Zapper' },
    { category: 'Security Scanners', items: 'MythX, Slither' },
    { category: 'Approval Checkers', items: 'Revoke.cash' },
    { category: 'Contract Auditors', items: 'CertiK, OpenZeppelin' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-900/20 border-blue-500/30 hover:border-blue-500/50 text-blue-400',
      green: 'bg-green-900/20 border-green-500/30 hover:border-green-500/50 text-green-400',
      purple: 'bg-purple-900/20 border-purple-500/30 hover:border-purple-500/50 text-purple-400',
      red: 'bg-red-900/20 border-red-500/30 hover:border-red-500/50 text-red-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="prose prose-invert max-w-none">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-6 w-6 text-blue-400" />
        <h1 className="text-2xl md:text-3xl font-bold text-white m-0">
          Best Practices Keamanan
        </h1>
      </div>

      <div className="space-y-6">
        {practices.map((practice, index) => (
          <section key={index} className={`${getColorClasses(practice.color)} backdrop-blur-sm p-4 md:p-6 rounded-lg border transition-all duration-300`}>
            <div className="flex items-start gap-3 mb-3">
              <practice.icon className={`h-5 w-5 mt-1 flex-shrink-0 ${
                practice.color === 'blue' ? 'text-blue-400' : 
                practice.color === 'green' ? 'text-green-400' : 
                practice.color === 'purple' ? 'text-purple-400' : 
                'text-red-400'
              }`} />
              <h2 className={`text-lg md:text-xl font-semibold m-0 ${
                practice.color === 'blue' ? 'text-blue-400' : 
                practice.color === 'green' ? 'text-green-400' : 
                practice.color === 'purple' ? 'text-purple-400' : 
                'text-red-400'
              }`}>
                {practice.title}
              </h2>
            </div>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm md:text-base pl-4">
              {practice.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </section>
        ))}

        <section className="bg-green-900/20 backdrop-blur-sm border border-green-500/30 p-4 md:p-6 rounded-lg hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-start gap-3 mb-4">
            <Wrench className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <h2 className="text-lg md:text-xl font-semibold text-green-400 m-0">
              Tools Keamanan Recommended
            </h2>
          </div>
          <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
            {tools.map((tool, toolIndex) => (
              <div key={toolIndex} className="text-gray-300 text-sm md:text-base">
                <span className="text-green-300 font-semibold block md:inline">{tool.category}:</span>
                <span className="block md:inline md:ml-1">{tool.items}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BestPracticesMDX;
