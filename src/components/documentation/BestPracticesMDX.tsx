
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
      blue: 'bg-blue-900/20 border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-900/30 text-blue-400',
      green: 'bg-green-900/20 border-green-500/30 hover:border-green-500/50 hover:bg-green-900/30 text-green-400',
      purple: 'bg-purple-900/20 border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-900/30 text-purple-400',
      red: 'bg-red-900/20 border-red-500/30 hover:border-red-500/50 hover:bg-red-900/30 text-red-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 text-white">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 md:mb-8">
        <Shield className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-blue-400 flex-shrink-0" />
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white">
          Best Practices Keamanan
        </h3>
      </div>

      <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {practices.map((practice, index) => (
          <div key={index} className={`${getColorClasses(practice.color)} backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border transition-all duration-300 hover:scale-[1.02]`}>
            <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
              <practice.icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mt-1 flex-shrink-0 ${
                practice.color === 'blue' ? 'text-blue-400' : 
                practice.color === 'green' ? 'text-green-400' : 
                practice.color === 'purple' ? 'text-purple-400' : 
                'text-red-400'
              }`} />
              <h4 className={`font-semibold text-sm sm:text-base md:text-lg lg:text-xl ${
                practice.color === 'blue' ? 'text-blue-400' : 
                practice.color === 'green' ? 'text-green-400' : 
                practice.color === 'purple' ? 'text-purple-400' : 
                'text-red-400'
              }`}>
                {practice.title}
              </h4>
            </div>
            <ul className="text-gray-300 space-y-2 sm:space-y-3 list-disc list-inside text-xs sm:text-sm md:text-base">
              {practice.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="bg-green-900/20 backdrop-blur-sm border border-green-500/30 p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg hover:border-green-500/50 hover:bg-green-900/30 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-5">
            <Wrench className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-green-400 text-sm sm:text-base md:text-lg lg:text-xl">
              Tools Keamanan Recommended
            </h4>
          </div>
          <div className="grid gap-3 sm:gap-4 md:gap-5 sm:grid-cols-1 md:grid-cols-2">
            {tools.map((tool, toolIndex) => (
              <div key={toolIndex} className="text-gray-300 text-xs sm:text-sm md:text-base">
                <strong className="text-green-300 block sm:inline">{tool.category}:</strong>
                <span className="block sm:inline sm:ml-1">{tool.items}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestPracticesMDX;
