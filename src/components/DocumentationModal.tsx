
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Shield, AlertTriangle, Lock, Eye, Globe } from 'lucide-react';

const DocumentationModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:text-white transition-all duration-300"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Dokumentasi Web3
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-gray-900/95 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <Shield className="mr-3 h-6 w-6 text-blue-400" />
            Panduan Keamanan Web3 & Blockchain
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="intro" className="text-xs">Pengenalan</TabsTrigger>
            <TabsTrigger value="security" className="text-xs">Keamanan</TabsTrigger>
            <TabsTrigger value="threats" className="text-xs">Ancaman</TabsTrigger>
            <TabsTrigger value="best-practices" className="text-xs">Best Practices</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[60vh] w-full">
            <TabsContent value="intro" className="text-white space-y-6 p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-semibold">Apa itu Web3 dan Blockchain?</h3>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Web3 (Web 3.0)</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Web3 adalah generasi ketiga dari internet yang berbasis pada teknologi blockchain. 
                    Berbeda dengan Web2 yang terpusat, Web3 memberikan kontrol penuh kepada pengguna 
                    atas data dan aset digital mereka.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Blockchain</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Blockchain adalah teknologi buku besar terdistribusi yang mencatat transaksi 
                    secara aman dan transparan. Setiap blok berisi kumpulan transaksi yang 
                    dikriptografi dan terhubung dengan blok sebelumnya.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Smart Contract</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Smart contract adalah program komputer yang berjalan di blockchain dan 
                    mengeksekusi perjanjian secara otomatis ketika kondisi tertentu terpenuhi. 
                    Mereka menghilangkan kebutuhan akan perantara.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">DeFi (Decentralized Finance)</h4>
                  <p className="text-gray-300 leading-relaxed">
                    DeFi adalah sistem keuangan yang dibangun di atas blockchain yang memungkinkan 
                    layanan keuangan tanpa perantara tradisional seperti bank atau broker.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="text-white space-y-6 p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-semibold">Prinsip Keamanan Web3</h3>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Keamanan Private Key</h4>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Private key adalah kunci akses ke wallet dan aset digital Anda</li>
                    <li>Jangan pernah membagikan private key kepada siapapun</li>
                    <li>Simpan private key di tempat yang aman dan offline</li>
                    <li>Gunakan hardware wallet untuk keamanan maksimal</li>
                    <li>Buat backup private key di beberapa lokasi yang aman</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Seed Phrase Security</h4>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Seed phrase (mnemonic phrase) adalah cara recovery wallet Anda</li>
                    <li>Tulis seed phrase di kertas, jangan simpan digital</li>
                    <li>Jangan foto atau screenshot seed phrase</li>
                    <li>Simpan di safe deposit box atau brankas</li>
                    <li>Verifikasi seed phrase setelah setup wallet</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Multi-Signature Wallets</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Gunakan multi-sig wallet untuk aset berharga tinggi. Multi-sig memerlukan 
                    beberapa signature untuk mengotorisasi transaksi, memberikan lapisan keamanan tambahan.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="threats" className="text-white space-y-6 p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <h3 className="text-xl font-semibold">Ancaman dan Serangan Umum</h3>
                </div>

                <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Phishing Attacks</h4>
                  <p className="text-gray-300 mb-2">Website atau email palsu yang meniru platform legitimate:</p>
                  <ul className="text-gray-300 space-y-1 list-disc list-inside text-sm">
                    <li>Selalu periksa URL dengan teliti</li>
                    <li>Bookmark website resmi</li>
                    <li>Jangan klik link dari email atau pesan</li>
                    <li>Verifikasi certificate SSL website</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Rug Pull</h4>
                  <p className="text-gray-300 mb-2">Developer menguras liquidity pool dan melarikan diri:</p>
                  <ul className="text-gray-300 space-y-1 list-disc list-inside text-sm">
                    <li>Periksa audit smart contract</li>
                    <li>Cek locked liquidity</li>
                    <li>Analisis tokenomics</li>
                    <li>Verifikasi tim developer</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Smart Contract Exploits</h4>
                  <p className="text-gray-300 mb-2">Bug dalam smart contract yang dieksploitasi:</p>
                  <ul className="text-gray-300 space-y-1 list-disc list-inside text-sm">
                    <li>Reentrancy attacks</li>
                    <li>Integer overflow/underflow</li>
                    <li>Flash loan attacks</li>
                    <li>Oracle manipulation</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Social Engineering</h4>
                  <p className="text-gray-300 mb-2">Manipulasi psikologis untuk mendapatkan informasi:</p>
                  <ul className="text-gray-300 space-y-1 list-disc list-inside text-sm">
                    <li>Fake customer support</li>
                    <li>Impersonation di social media</li>
                    <li>Fake giveaways/airdrops</li>
                    <li>Romance scams</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="best-practices" className="text-white space-y-6 p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-semibold">Best Practices Keamanan</h3>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Wallet Security</h4>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Gunakan hardware wallet untuk aset besar</li>
                    <li>Aktifkan 2FA di semua akun</li>
                    <li>Gunakan wallet terpisah untuk trading dan hodling</li>
                    <li>Update wallet software secara rutin</li>
                    <li>Test recovery process secara berkala</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Transaction Safety</h4>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Double-check alamat penerima</li>
                    <li>Mulai dengan jumlah kecil untuk test</li>
                    <li>Periksa gas fees sebelum confirm</li>
                    <li>Gunakan reputable DEX dan CEX</li>
                    <li>Set slippage tolerance yang wajar</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">DeFi Safety</h4>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Audit protocol sebelum invest</li>
                    <li>Diversifikasi risiko</li>
                    <li>Pahami impermanent loss</li>
                    <li>Monitor yield farming rewards</li>
                    <li>Revoke unused token approvals</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Emergency Response</h4>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Siapkan emergency recovery plan</li>
                    <li>Backup semua data penting</li>
                    <li>Simpan recovery phrase di multiple locations</li>
                    <li>Dokumentasikan semua wallet addresses</li>
                    <li>Update security measures secara berkala</li>
                  </ul>
                </div>

                <div className="bg-green-900/20 border border-green-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Tools Keamanan Recommended</h4>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li><strong>Hardware Wallets:</strong> Ledger, Trezor</li>
                    <li><strong>Portfolio Trackers:</strong> DeBank, Zapper</li>
                    <li><strong>Security Scanners:</strong> MythX, Slither</li>
                    <li><strong>Approval Checkers:</strong> Revoke.cash</li>
                    <li><strong>Contract Auditors:</strong> CertiK, OpenZeppelin</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentationModal;
