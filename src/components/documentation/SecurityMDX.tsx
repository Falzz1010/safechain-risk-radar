
import React from 'react';
import { Lock, Key, Shield, HardDrive } from 'lucide-react';

const SecurityMDX = () => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 text-white">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 md:mb-8">
        <Lock className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-green-400 flex-shrink-0" />
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white">
          Prinsip Keamanan Web3
        </h3>
      </div>

      <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border border-gray-700/50 hover:border-green-500/40 hover:bg-gray-800/80 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <Key className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-green-400 text-sm sm:text-base md:text-lg lg:text-xl">
              Keamanan Private Key
            </h4>
          </div>
          <ul className="text-gray-300 space-y-2 sm:space-y-3 list-disc list-inside text-xs sm:text-sm md:text-base lg:text-lg">
            <li className="leading-relaxed">Private key adalah kunci akses ke wallet dan aset digital Anda</li>
            <li className="leading-relaxed">Jangan pernah membagikan private key kepada siapapun</li>
            <li className="leading-relaxed">Simpan private key di tempat yang aman dan offline</li>
            <li className="leading-relaxed">Gunakan hardware wallet untuk keamanan maksimal</li>
            <li className="leading-relaxed">Buat backup private key di beberapa lokasi yang aman</li>
          </ul>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border border-gray-700/50 hover:border-green-500/40 hover:bg-gray-800/80 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-green-400 text-sm sm:text-base md:text-lg lg:text-xl">
              Seed Phrase Security
            </h4>
          </div>
          <ul className="text-gray-300 space-y-2 sm:space-y-3 list-disc list-inside text-xs sm:text-sm md:text-base lg:text-lg">
            <li className="leading-relaxed">Seed phrase (mnemonic phrase) adalah cara recovery wallet Anda</li>
            <li className="leading-relaxed">Tulis seed phrase di kertas, jangan simpan digital</li>
            <li className="leading-relaxed">Jangan foto atau screenshot seed phrase</li>
            <li className="leading-relaxed">Simpan di safe deposit box atau brankas</li>
            <li className="leading-relaxed">Verifikasi seed phrase setelah setup wallet</li>
          </ul>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border border-gray-700/50 hover:border-green-500/40 hover:bg-gray-800/80 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <HardDrive className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-green-400 text-sm sm:text-base md:text-lg lg:text-xl">
              Multi-Signature Wallets
            </h4>
          </div>
          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">
            Gunakan multi-sig wallet untuk aset berharga tinggi. Multi-sig memerlukan 
            beberapa signature untuk mengotorisasi transaksi, memberikan lapisan keamanan tambahan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityMDX;
