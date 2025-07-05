
import React from 'react';
import { Lock, Key, Shield, HardDrive } from 'lucide-react';

const SecurityMDX = () => {
  return (
    <div className="prose prose-invert max-w-none">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="h-6 w-6 text-green-400" />
        <h1 className="text-2xl md:text-3xl font-bold text-white m-0">
          Prinsip Keamanan Web3
        </h1>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-green-500/40 transition-all duration-300">
          <div className="flex items-start gap-3 mb-3">
            <Key className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <h2 className="text-lg md:text-xl font-semibold text-green-400 m-0">
              Keamanan Private Key
            </h2>
          </div>
          <div className="space-y-3">
            <p className="text-gray-300 leading-relaxed text-sm md:text-base m-0">
              Private key adalah kunci akses ke wallet dan aset digital Anda. Berikut adalah prinsip penting:
            </p>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm md:text-base pl-4">
              <li>Jangan pernah membagikan private key kepada siapapun</li>
              <li>Simpan private key di tempat yang aman dan offline</li>
              <li>Gunakan hardware wallet untuk keamanan maksimal</li>
              <li>Buat backup private key di beberapa lokasi yang aman</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-green-500/40 transition-all duration-300">
          <div className="flex items-start gap-3 mb-3">
            <Shield className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <h2 className="text-lg md:text-xl font-semibold text-green-400 m-0">
              Seed Phrase Security
            </h2>
          </div>
          <div className="space-y-3">
            <p className="text-gray-300 leading-relaxed text-sm md:text-base m-0">
              Seed phrase (mnemonic phrase) adalah cara recovery wallet Anda:
            </p>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm md:text-base pl-4">
              <li>Tulis seed phrase di kertas, jangan simpan digital</li>
              <li>Jangan foto atau screenshot seed phrase</li>
              <li>Simpan di safe deposit box atau brankas</li>
              <li>Verifikasi seed phrase setelah setup wallet</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-green-500/40 transition-all duration-300">
          <div className="flex items-start gap-3 mb-3">
            <HardDrive className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <h2 className="text-lg md:text-xl font-semibold text-green-400 m-0">
              Multi-Signature Wallets
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base m-0">
            Gunakan multi-sig wallet untuk aset berharga tinggi. Multi-sig memerlukan 
            beberapa signature untuk mengotorisasi transaksi, memberikan lapisan keamanan tambahan.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SecurityMDX;
