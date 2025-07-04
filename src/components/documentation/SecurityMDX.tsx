
import React from 'react';
import { Lock, Key, Shield, HardDrive } from 'lucide-react';

const SecurityMDX = () => {
  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center space-x-3 mb-6">
        <Lock className="h-6 w-6 text-green-400" />
        <h3 className="text-xl font-semibold">Prinsip Keamanan Web3</h3>
      </div>

      <div className="grid gap-4 md:gap-6">
        <div className="bg-gray-800/50 p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
          <div className="flex items-start space-x-3 mb-3">
            <Key className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-green-400 text-sm md:text-base">Keamanan Private Key</h4>
          </div>
          <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm md:text-base">
            <li>Private key adalah kunci akses ke wallet dan aset digital Anda</li>
            <li>Jangan pernah membagikan private key kepada siapapun</li>
            <li>Simpan private key di tempat yang aman dan offline</li>
            <li>Gunakan hardware wallet untuk keamanan maksimal</li>
            <li>Buat backup private key di beberapa lokasi yang aman</li>
          </ul>
        </div>

        <div className="bg-gray-800/50 p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
          <div className="flex items-start space-x-3 mb-3">
            <Shield className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-green-400 text-sm md:text-base">Seed Phrase Security</h4>
          </div>
          <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm md:text-base">
            <li>Seed phrase (mnemonic phrase) adalah cara recovery wallet Anda</li>
            <li>Tulis seed phrase di kertas, jangan simpan digital</li>
            <li>Jangan foto atau screenshot seed phrase</li>
            <li>Simpan di safe deposit box atau brankas</li>
            <li>Verifikasi seed phrase setelah setup wallet</li>
          </ul>
        </div>

        <div className="bg-gray-800/50 p-4 md:p-6 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
          <div className="flex items-start space-x-3 mb-3">
            <HardDrive className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-green-400 text-sm md:text-base">Multi-Signature Wallets</h4>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Gunakan multi-sig wallet untuk aset berharga tinggi. Multi-sig memerlukan 
            beberapa signature untuk mengotorisasi transaksi, memberikan lapisan keamanan tambahan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityMDX;
