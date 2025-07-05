
import React from 'react';
import { Globe, Shield, Code, DollarSign } from 'lucide-react';

const IntroductionMDX = () => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 text-white">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 md:mb-8">
        <Globe className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-blue-400 flex-shrink-0" />
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white">
          Pengenalan Web3 dan Blockchain
        </h3>
      </div>
      
      <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border border-gray-700/50 hover:border-blue-500/40 hover:bg-gray-800/80 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <Globe className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-blue-400 text-sm sm:text-base md:text-lg lg:text-xl">
              Web3 (Web 3.0)
            </h4>
          </div>
          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">
            Web3 adalah generasi ketiga dari internet yang berbasis pada teknologi blockchain. 
            Berbeda dengan Web2 yang terpusat, Web3 memberikan kontrol penuh kepada pengguna 
            atas data dan aset digital mereka.
          </p>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border border-gray-700/50 hover:border-green-500/40 hover:bg-gray-800/80 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-green-400 text-sm sm:text-base md:text-lg lg:text-xl">
              Blockchain
            </h4>
          </div>
          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">
            Blockchain adalah teknologi buku besar terdistribusi yang mencatat transaksi 
            secara aman dan transparan. Setiap blok berisi kumpulan transaksi yang 
            dikriptografi dan terhubung dengan blok sebelumnya.
          </p>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border border-gray-700/50 hover:border-purple-500/40 hover:bg-gray-800/80 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <Code className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-purple-400 text-sm sm:text-base md:text-lg lg:text-xl">
              Smart Contract
            </h4>
          </div>
          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">
            Smart contract adalah program komputer yang berjalan di blockchain dan 
            mengeksekusi perjanjian secara otomatis ketika kondisi tertentu terpenuhi. 
            Mereka menghilangkan kebutuhan akan perantara.
          </p>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border border-gray-700/50 hover:border-yellow-500/40 hover:bg-gray-800/80 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-yellow-400 text-sm sm:text-base md:text-lg lg:text-xl">
              DeFi (Decentralized Finance)
            </h4>
          </div>
          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">
            DeFi adalah sistem keuangan yang dibangun di atas blockchain yang memungkinkan 
            layanan keuangan tanpa perantara tradisional seperti bank atau broker.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionMDX;
