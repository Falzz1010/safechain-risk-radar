
import React from 'react';
import { Globe, Shield, Code, DollarSign } from 'lucide-react';

const IntroductionMDX = () => {
  return (
    <div className="prose prose-invert max-w-none">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="h-6 w-6 text-blue-400" />
        <h1 className="text-2xl md:text-3xl font-bold text-white m-0">
          Pengenalan Web3 dan Blockchain
        </h1>
      </div>
      
      <div className="space-y-6">
        <section className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-blue-500/40 transition-all duration-300">
          <div className="flex items-start gap-3 mb-3">
            <Globe className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
            <h2 className="text-lg md:text-xl font-semibold text-blue-400 m-0">
              Web3 (Web 3.0)
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base m-0">
            Web3 adalah generasi ketiga dari internet yang berbasis pada teknologi blockchain. 
            Berbeda dengan Web2 yang terpusat, Web3 memberikan kontrol penuh kepada pengguna 
            atas data dan aset digital mereka.
          </p>
        </section>

        <section className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-green-500/40 transition-all duration-300">
          <div className="flex items-start gap-3 mb-3">
            <Shield className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <h2 className="text-lg md:text-xl font-semibold text-green-400 m-0">
              Blockchain
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base m-0">
            Blockchain adalah teknologi buku besar terdistribusi yang mencatat transaksi 
            secara aman dan transparan. Setiap blok berisi kumpulan transaksi yang 
            dikriptografi dan terhubung dengan blok sebelumnya.
          </p>
        </section>

        <section className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-purple-500/40 transition-all duration-300">
          <div className="flex items-start gap-3 mb-3">
            <Code className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
            <h2 className="text-lg md:text-xl font-semibold text-purple-400 m-0">
              Smart Contract
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base m-0">
            Smart contract adalah program komputer yang berjalan di blockchain dan 
            mengeksekusi perjanjian secara otomatis ketika kondisi tertentu terpenuhi. 
            Mereka menghilangkan kebutuhan akan perantara.
          </p>
        </section>

        <section className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-yellow-500/40 transition-all duration-300">
          <div className="flex items-start gap-3 mb-3">
            <DollarSign className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
            <h2 className="text-lg md:text-xl font-semibold text-yellow-400 m-0">
              DeFi (Decentralized Finance)
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base m-0">
            DeFi adalah sistem keuangan yang dibangun di atas blockchain yang memungkinkan 
            layanan keuangan tanpa perantara tradisional seperti bank atau broker.
          </p>
        </section>
      </div>
    </div>
  );
};

export default IntroductionMDX;
