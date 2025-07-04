
import React from 'react';
import { Globe, Shield, Code, DollarSign } from 'lucide-react';

const IntroductionMDX = () => {
  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center space-x-3 mb-6">
        <Globe className="h-6 w-6 text-blue-400" />
        <h3 className="text-xl font-semibold">Pengenalan Web3 dan Blockchain</h3>
      </div>
      
      <div className="grid gap-4 md:gap-6">
        <div className="bg-gray-800/50 p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-start space-x-3 mb-3">
            <Globe className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-blue-400 text-sm md:text-base">Web3 (Web 3.0)</h4>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Web3 adalah generasi ketiga dari internet yang berbasis pada teknologi blockchain. 
            Berbeda dengan Web2 yang terpusat, Web3 memberikan kontrol penuh kepada pengguna 
            atas data dan aset digital mereka.
          </p>
        </div>

        <div className="bg-gray-800/50 p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-start space-x-3 mb-3">
            <Shield className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-green-400 text-sm md:text-base">Blockchain</h4>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Blockchain adalah teknologi buku besar terdistribusi yang mencatat transaksi 
            secara aman dan transparan. Setiap blok berisi kumpulan transaksi yang 
            dikriptografi dan terhubung dengan blok sebelumnya.
          </p>
        </div>

        <div className="bg-gray-800/50 p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-start space-x-3 mb-3">
            <Code className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-purple-400 text-sm md:text-base">Smart Contract</h4>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Smart contract adalah program komputer yang berjalan di blockchain dan 
            mengeksekusi perjanjian secara otomatis ketika kondisi tertentu terpenuhi. 
            Mereka menghilangkan kebutuhan akan perantara.
          </p>
        </div>

        <div className="bg-gray-800/50 p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-start space-x-3 mb-3">
            <DollarSign className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-yellow-400 text-sm md:text-base">DeFi (Decentralized Finance)</h4>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            DeFi adalah sistem keuangan yang dibangun di atas blockchain yang memungkinkan 
            layanan keuangan tanpa perantara tradisional seperti bank atau broker.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionMDX;
